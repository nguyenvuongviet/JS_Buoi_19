class StaffList {
  constructor() {
    this.arr = [];
  }

  addStaff(staff) {
    this.arr.push(staff);
  }

  findIndexStaff(account) {
    let index = -1;
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].account === account) {
        index = i;
        break;
      }
    }
    return index;
  }

  removeStaff(account) {
    const index = this.findIndexStaff(account);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }

  editStaff(account) {
    const index = this.findIndexStaff(account);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  }

  updateStaff(staff) {
    const index = this.findIndexStaff(staff.account);
    if (index !== -1) {
      this.arr[index] = staff;
    }
  }

  searchStaff(keyword) {
    const result = [];
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].staffRate.toLowerCase().includes(keyword.toLowerCase())) {
        result.push(this.arr[i]);
      }
    }
    return result;
  }
}

export default StaffList;
