
const EnumRoleType = {
  ADMIN: 'admin',
  EDIFACT: 'edifact',
  MANAGER: 'manager',
  STAFF: 'staff',
}

const userPermission = {
  ADMIN: {
    visit: ['1', '2', '3', '31', '32', '33', '34', '5', '51', '6', '61', '62', '63'],
    role: EnumRoleType.ADMIN,
  },
  EDIFACT: {
    visit: ['1', '2', '3', '31', '32', '33', '34', '5', '51', '6', '61', '62', '63'],
    role: EnumRoleType.EDIFACT,
  },
  MANAGER: {
    visit: ['1', '2', '3', '31', '32', '33', '34', '5', '51', '6', '61', '62', '63'],
    role: EnumRoleType.MANAGER,
  },
  STAFF: {
    visit: ['1', '2', '3', '31', '32', '33', '34', '5', '51', '6', '61', '62', '63'],
    role: EnumRoleType.STAFF,
  },
}

const adminUsers = [
  {
    id: 1,
    permissions: userPermission.ADMIN,
  },
  {
    id: 2,
    permissions: userPermission.EDIFACT,
  },
  {
    id: 3,
    permissions: userPermission.MANAGER,
  },
  {
    id: 4,
    permissions: userPermission.STAFF,
  },
]

module.exports = {
  EnumRoleType,
  userPermission,
  adminUsers,
}
