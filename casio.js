// chúng ta có 4 nhóm button
// nhóm 1 : số (số bao gồm phím . và +/-)
// nhóm 2 :  phép tính (+ - * / %)
// nhóm 3 : xóa (<CE)
// nhóm 4 :=
//  quy tắc nhập phép tính : khi bấm + mày ngay sau đó bấm - thì tính là -
//  quy tắc nhập phép tính : khi bấm % mày ngay sau đó bấm - thì tính là 0
//  quy tắc nhập phép tính :(nhân - chia) 2 (cộng trừ): 5+6*2= 5+12=17
//  quy tắc nhập phép tính : ưu tiên trái sang phải > 5+6-7 = 11-7 = 4
//  nhập : 1+15*2+6/3+2+2
// mảng số 0 = 1  mảng  phép tính
                   
//         1= 15    0 = +
//         2= 2     1 = *
//         3 = 6    2 = +
     //    4= 3     3 = /
     //    5 = 2    4 = +
     //    6 = 2    5 = *
    //  *******************************
    // bước 1 tính các giá trị của + hoặc / trong biểu thức

 // kết quả
    var ketqua = document.getElementById("ketqua");
    // ket thuc phep tinh
    var end = false;
// đổi dấu
    var doi_dau = false;
    // ghi nhớ phép tính cũ nếu có thay đổi phép tính
    var phep_tinh_cu = "";
//  số phép tính ưu tiên tìm thấy
// vừa bấm phép tính
var doi_phep_tinh = false;
    var uu_tien = 0;
    // mảng số ghi nhớ các số hạng
    var mang_so_max_index = 0;
    var mang_so = new Array();
    // mảng ghi nhớ phép tính
    var mang_pt_max_index = 0;
    var mang_pt = new Array();
    // chuỗi kết quả
    var ketqua_old = "";
    // phim mới
    var newKeboard = "";
    // add sự kiên
function ClickButton(obj){
        
        if(end){
            ketqua.value = "";
            end = false;
        }

        if(ketqua_old =="" && newKeboard == ""){
            ketqua_old = ketqua.value;
        }
        if(ketqua_old == "0"){
            ketqua_old = "";
        }
        var type = obj.innerHTML;
        // nhóm số
        if(
            type =="0" ||
            type =="1" ||
            type =="2" ||
            type =="3" ||
            type =="4" ||
            type =="5" ||
            type =="6" ||
            type =="7" ||
            type =="8" ||
            type =="9" ||
            type =="+/-" ||
            type =="." )
     {
         doi_phep_tinh = false;
        //    đổi dấu
        if(type =='+/-'){
          if(doi_dau){
              doi_dau = false;
              newKeboard = newKeboard.substring(1);
          }else{
              doi_dau = true;
              newKeboard = '-'+newKeboard;
          }
        }else{
            newKeboard +=type;
        }
        // thay đổi hiển thị
        ketqua.value = ketqua_old + newKeboard;
     }else if(
            type =="+" ||
            type =="-" ||
            type =="x" ||
            type =="/" 
     ) 
     {
        //  trước đó đã bấm phép tính
        if(doi_phep_tinh){
        // nếu phép tính cũ là ưu tiên , nhưng phép tinh mới không ưu tiên
        if((phep_tinh_cu == "x" || phep_tinh_cu == "/") && (type == "+" || type == "-")){
                   uu_tien --;
        }
        // nếu phép tính cũ không ưu tiên nhưng phép tính mới ưu tiên
        else if((phep_tinh_cu == "+" || phep_tinh_cu == "-") && (type == "x" || type == "/")){
                   uu_tien ++;
        }
        // lưu vào mảng phép tính
            mang_pt[mang_pt_max_index-1] =type;
           // xử lý hiển thị
        ketqua.value = ketqua.value.substring(0,ketqua.value.length-1) + type;
        
        
        }
        // chưa bấm phép tính
        else{
            // ghi nhớ phép tính
            phep_tinh_cu = type;
        // lưu vào mảng số
        mang_so[mang_so_max_index] = parseFloat(newKeboard);
        mang_so_max_index++;
        //  lưu vào mảng phép tính
        mang_pt[mang_pt_max_index] = type;
        mang_pt_max_index++;
        // xử lý hiển thị
        ketqua.value = ketqua.value + type;
        // cộng số đếm ưu tiên lên
        if (type = "x" || type == "/"){
            uu_tien ++;
        }

        } 
        doi_phep_tinh = true;
        // đổi giá trị 2 chuỗi về rỗng
        ketqua_old = "";
        newKeboard = "";
     }
    //  nhóm dấu bằng
     else if( type == "=" || type == "%")
     {
        end = true;
    //    dấu bằng
         if(newKeboard !=""){
         mang_so[mang_so_max_index] = parseFloat(newKeboard);
             }
            // dấu =
            if(type == "="){
            //  gọi hàm tính kết quả
            GetValue();
         }
        //    dấu %
         else
         {
        // gọi hàm tính
           Getpercent();
         }
           // rest array ve 0
            ketqua_old ="";
            newKeboard = "";
            mang_so = new Array();
            mang_pt =  new Array();
            mang_pt_max_index = 0;
            mang_so_max_index = 0;
            uu_tien = 0;
     }
    //  CE
    else if(type == "CE"){
        newKeboard = "";
         // thay đổi hiển thị
         ketqua.value = ketqua_old + newKeboard;
    }
    // phím xóa 1 kí tự
    else{
        if(newKeboard.length >1){
            newKeboard = newKeboard.substring(0, newKeboard.length-1);
        }else{
            newKeboard = "";
        }
         // thay đổi hiển thị
         ketqua.value = ketqua_old + newKeboard;
    }
     
}
// tinh %
function Getpercent(){
    mang_pt_max_index --;
    // kiem tra mang so 
    if(mang_so_max_index != 1 ||  mang_so[1] == 0){
       ketqua.value = "0";
    }
    // phep tinh 
    else if(mang_pt_max_index != 0){
        ketqua.value = "0";
    }
    // phep tinh la chia
    else if(mang_pt[0] != "/" ){
        ketqua.value = "0";
    }
    //  tat ca dieu kieu da vuot qua
    else{
        var _kq = mang_so[0] / mang_so[1] * 100;
        ketqua.value = _kq;
    }
     
}
// tinh gia tri thuong
function GetValue(){
    mang_pt_max_index --;
     // phep tinh uu tien
    while(uu_tien > 0){
        for(var index = 0; index <= mang_pt_max_index; index ++ ){
            if(mang_pt[index] == "x" || mang_pt[index] =="/" ){
            //   lấy 2 số hạng
              var sh1 = mang_so[index];
              var sh2= mang_so[index+1];
            //   tính kết quả
              var kqt = 0;
            if(mang_pt[index]=="x"){
                 kqt = sh1 * sh2;
              }
            else if(sh2 == 0)
              {
                ketqua.value = 0;
              }
            else
              {
                kqt = sh1 / sh2;
              }
            //   thay thế số hạng
                 mang_so[index] = kqt;
            //    dồn số hạng
            for(var new_index = index + 1; new_index < mang_so_max_index; new_index++){
                   mang_so[new_index] = mang_so[new_index+1];
                 }
                    mang_so_max_index--;
              //xóa bỏ phép tính
            for(var new_index = index ; new_index < mang_pt_max_index ;new_index++){
                   mang_pt[new_index] = mang_pt[new_index+1];
                 }
                   mang_pt_max_index--;
                //    xóa ghi nhớ ưu tiên
                   uu_tien --;
                
            }
           
       }
        // ngắt vòng lập
        break;
   }
    //bước 2 phép tính thường
    while(mang_so_max_index > 0){
            // lấy số hạng
        var sh1 = mang_so[0];
        var sh2 = mang_so[1];
        //   tính kết quả
        var kqt = 0;
        if(mang_pt[0]=="+"){
            kqt = sh1 + sh2;
        }
        else
        {
            kqt = sh1 - sh2;
        }
        //   thay thế số hạng
        mang_so[0] = kqt;
        //    dồn số hạng
        for(var new_index = 1; new_index < mang_so_max_index ; new_index ++ ){
                mang_so[ new_index ] = mang_so[new_index + 1 ];
            }
            mang_so_max_index --;
        //xóa bỏ phép tính
        for(var new_index = 0 ; new_index < mang_pt_max_index ; new_index++ ){
                mang_pt[ new_index ] = mang_pt[ new_index + 1 ];
            }
                mang_pt_max_index --;
   } 
//    in kết quả
      ketqua.value = mang_so[0];
}