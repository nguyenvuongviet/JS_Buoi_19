import { getEleId } from "./../controllers/main.js";
class Validation {
  // Kiểm tra tài khoản
  checkAccount(account, divId) {
    const letter = /^[0-9]{4,6}$/;

    const errorMess = !account
      ? "Tài khoản không được để trống!"
      : !account.match(letter)
      ? "Tài khoản phải có 4-6 ký số!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra trùng tài khoản
  checkAccountExist(account, divId, staffList) {
    let isExist = false;
    for (let i = 0; i < staffList.length; i++) {
      if (staffList[i].account === account) {
        isExist = true;
        break;
      }
    }
    const errorMess = isExist ? "Tài khoản đã tồn tại!" : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra tên nhân viên
  checkName(name, divId) {
    const letter = /^[A-Za-z\s]+$/;

    const errorMess = !name
      ? "Tên nhân viên không được để trống!"
      : !name.match(letter)
      ? "Tên nhân viên phải là chữ cái!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra email
  checkEmail(email, divId) {
    const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const errorMess = !email
      ? "Email không được để trống!"
      : !email.match(letter)
      ? "Email không đúng định dạng!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra mật khẩu
  checkPassword(password, divId) {
    const letter =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

    const errorMess = !password
      ? "Mật khẩu không được sé trống!"
      : !password.match(letter)
      ? "Mật khẩu phải có 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra ngày làm
  checkHireDate(hireDate, divId) {
    const letter = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    const errorMess = !hireDate
      ? "Ngày làm không được sé trống!"
      : !hireDate.match(letter)
      ? "Ngày làm phải có định dạng mm/dd/yyyy!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra lương cơ bản
  checkBasicSalary(basicSalary, divId) {
    const errorMess = !basicSalary
      ? "Lương cơ bản không được để trống!"
      : basicSalary < 1000000 || basicSalary > 20000000
      ? "Lương cơ bản 1 000 000 - 20 000 000!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra chức vụ
  checkPosition(position, divId) {
    const validPosition = ["Sếp", "Trưởng phòng", "Nhân viên"];
    const errorMess = !validPosition.includes(position)
      ? "Vui lòng chọn chức vụ hợp lệ!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Kiểm tra số giờ làm
  checkMonthlyHours(monthlyHours, divId) {
    const errorMess = !monthlyHours
      ? "Số giờ làm không được để trống!"
      : monthlyHours < 80 || monthlyHours > 200
      ? "Số giờ làm 80 - 200 giờ!"
      : "";
    return this.handleError(divId, errorMess);
  }

  // Xử lý hiển thị lỗi
  handleError(divId, errorMess) {
    if (errorMess) {
      getEleId(divId).innerHTML = errorMess;
      getEleId(divId).style.display = "block";
      return false;
    }
    getEleId(divId).innerHTML = "";
    getEleId(divId).style.display = "none";
    return true;
  }
}

export default Validation;
