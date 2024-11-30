class Staff {
  constructor(
    _account,
    _name,
    _email,
    _password,
    _hireDate,
    _basicSalary,
    _position,
    _monthlyHours
  ) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.hireDate = _hireDate;
    this.basicSalary = parseFloat(_basicSalary.replace(/\s/g, ""));
    this.position = _position;
    this.monthlyHours = parseInt(_monthlyHours);
    this.totalSalary = this.calcTotalSalary();
    this.staffRate = this.rateStaff();
  }

  calcTotalSalary() {
    if (this.position === "Sếp") return this.basicSalary * 3;
    else if (this.position === "Trưởng phòng") return this.basicSalary * 2;
    else return this.basicSalary;
  }

  rateStaff() {
    if (this.monthlyHours >= 192) return "Xuất sắc";
    else if (this.monthlyHours >= 176) return "Giỏi";
    else if (this.monthlyHours >= 160) return "Khá";
    else return "Trung bình";
  }
}

export default Staff;
