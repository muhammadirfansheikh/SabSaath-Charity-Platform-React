const Roles = {
  SuperAdmin: 1,
  InvestigatingOfficer: 3,
  HOD: 11,
  Trustee: 12,
  Audit: 14,
  Accounts: 15,
  FrontDesk: 16,
  Marketing: 17,
};

const roleAuthentication = (id, page) => {
  switch (id) {
    case 1:
      return false;
    case 17:
      return page === "marketing" ? false : true;
    case 11:
      return false;
    case 12:
      return true;
    case 14:
      return true;
    case 15:
      return true;
    case 16:
      return true;
    default:
      break;
  }
};

export default roleAuthentication;
