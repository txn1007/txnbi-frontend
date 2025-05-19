export default function access(initialState: { currentUser?: API.UserInfoV0 }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin:
      currentUser && (currentUser.userRole === 'admin' || currentUser.userRole === 'operator'),
    // 运营角色可访问的页面权限
    canOperator:
      currentUser && (currentUser.userRole === 'admin' || currentUser.userRole === 'operator'),
    // 仅管理员可访问的页面权限
    canAdminOnly: currentUser && currentUser.userRole === 'admin',
    user: currentUser && currentUser.userRole === 'user',
  };
}
