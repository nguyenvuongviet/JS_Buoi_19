import Staff from "../models/staff.js";
import StaffList from "../models/staff-list.js";
import Validation from "../models/validation.js";

const validation = new Validation();
const staffList = new StaffList();

export const getEleId = (id) => document.getElementById(id);

const getInfoStaff = (isAdd) => {
  const account = getEleId("tknv").value;
  const name = getEleId("name").value;
  const email = getEleId("email").value;
  const password = getEleId("password").value;
  const hireDate = getEleId("datepicker").value;
  const basicSalary = getEleId("luongCB").value;
  const position = getEleId("chucvu").value;
  const monthlyHours = getEleId("gioLam").value;

  let isValid = true;

  if (isAdd) {
    isValid &=
      validation.checkAccount(account, "tbTKNV") &&
      validation.checkAccountExist(account, "tbTKNV", staffList.arr);
  }
  isValid &=
    validation.checkName(name, "tbTen") &&
    validation.checkEmail(email, "tbEmail") &&
    validation.checkPassword(password, "tbMatKhau") &&
    validation.checkHireDate(hireDate, "tbNgay") &&
    validation.checkBasicSalary(basicSalary, "tbLuongCB") &&
    validation.checkPosition(position, "tbChucVu") &&
    validation.checkMonthlyHours(monthlyHours, "tbGiolam");

  if (!isValid) return null;

  const staff = new Staff(
    account,
    name,
    email,
    password,
    hireDate,
    basicSalary,
    position,
    monthlyHours
  );

  return staff;
};

const renderStaffList = (data) => {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    const staff = data[i];
    content += `
          <tr>
              <td>${staff.account}</td>
              <td>${staff.name}</td>
              <td>${staff.email}</td>
              <td>${staff.hireDate}</td>
              <td>${staff.position}</td>
              <td>${staff.totalSalary}</td>
              <td>${staff.staffRate}</td>
              <td> 
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEditStaff('${staff.account}')">Sửa</button>
                  <button class="btn btn-danger" onclick="handleDeleteStaff('${staff.account}')">Xoá</button>
              </td>
          </tr>
      `;
  }
  getEleId("tableDanhSach").innerHTML = content;
};

const handleDeleteStaff = (account) => {
  console.log(staffList);
  staffList.removeStaff(account);
  renderStaffList(staffList.arr);
  setLocalStorage();
};

window.handleDeleteStaff = handleDeleteStaff;

const handleEditStaff = (account) => {
  getEleId("header-title").innerHTML = "Cập nhật nhân viên";
  getEleId("btnThemNV").style.display = "none";
  getEleId("btnCapNhat").style.display = "inline-block";

  const staff = staffList.editStaff(account);

  if (!staff) return;

  getEleId("tknv").disabled = true;
  getEleId("tknv").value = staff.account;
  getEleId("name").value = staff.name;
  getEleId("email").value = staff.email;
  getEleId("password").value = staff.password;
  getEleId("datepicker").value = staff.hireDate;
  getEleId("luongCB").value = staff.basicSalary;
  getEleId("chucvu").value = staff.position;
  getEleId("gioLam").value = staff.monthlyHours;
};

window.handleEditStaff = handleEditStaff;

const setLocalStorage = () => {
  const dataJSON = staffList.arr;
  const dataString = JSON.stringify(dataJSON);
  localStorage.setItem("STAFF_LIST", dataString);
};

const getLocalStorage = () => {
  const dataString = localStorage.getItem("STAFF_LIST");

  if (!dataString) return;

  const dataJSON = JSON.parse(dataString);
  staffList.arr = dataJSON;
  renderStaffList(staffList.arr);
};

getLocalStorage();

const resetForm = () => {
  getEleId("staffForm").reset();
  const errorMess = document.querySelectorAll(".sp-thongbao");
  errorMess.forEach((error) => {
    error.innerHTML = "";
    error.style.display = "none";
  });
};

getEleId("btnThem").onclick = function () {
  getEleId("header-title").innerHTML = "Thêm nhân viên";
  getEleId("btnThemNV").style.display = "inline-block";
  getEleId("btnCapNhat").style.display = "none";
  resetForm();
  getEleId("tknv").disabled = false;
};

getEleId("btnThemNV").onclick = function () {
  const staff = getInfoStaff(true);
  if (!staff) return;
  staffList.addStaff(staff);
  renderStaffList(staffList.arr);
  setLocalStorage();
  getEleId("btnDong").click();
};

getEleId("btnCapNhat").onclick = function () {
  const staff = getInfoStaff(false);
  if (!staff) return;
  staffList.updateStaff(staff);
  renderStaffList(staffList.arr);
  setLocalStorage();
  getEleId("btnDong").click();
};

getEleId("searchName").addEventListener("keyup", function () {
  const keyword = getEleId("searchName").value;
  const result = staffList.searchStaff(keyword);
  if (result.length > 0) {
    renderStaffList(result);
  } else {
    renderStaffList(staffList.arr);
  }
});
