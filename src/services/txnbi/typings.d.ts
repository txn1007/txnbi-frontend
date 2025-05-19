declare namespace API {
  type AdminBatchDeleteLogReq = {
    logIds: number[];
  };

  type AdminBatchDeleteLogResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminChartDetailResp = {
    chart?: ChartInfoV1;
    message?: string;
    statusCode?: number;
  };

  type AdminChartListResp = {
    charts?: ChartInfoV1[];
    message?: string;
    statusCode?: number;
    total?: number;
  };

  type AdminCreateLogReq = {
    ip: string;
    method: string;
    operation: string;
    path: string;
    userId: number;
  };

  type AdminCreateLogResp = {
    logId?: number;
    message?: string;
    statusCode?: number;
  };

  type AdminCreateUserReq = {
    userAccount: string;
    userPassword: string;
    userRole: 'admin' | 'user';
  };

  type AdminCreateUserResp = {
    message?: string;
    statusCode?: number;
    userId?: number;
  };

  type AdminDeleteChartResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminDeleteLogReq = {
    logId: number;
  };

  type AdminDeleteLogResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminDeleteUserReq = {
    userId: number;
  };

  type AdminDeleteUserResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminDisableUserReq = {
    /** 0-正常, 1-禁用 */
    status: 0 | 1;
    userId: number;
  };

  type AdminDisableUserResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminLogDetailResp = {
    log?: OperationLog;
    message?: string;
    statusCode?: number;
  };

  type AdminLogListResp = {
    logs?: OperationLog[];
    message?: string;
    statusCode?: number;
    total?: number;
  };

  type AdminUpdateChartResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminUpdateLogReq = {
    ip?: string;
    logId: number;
    method?: string;
    operation?: string;
    path?: string;
  };

  type AdminUpdateLogResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminUpdateUserReq = {
    userAccount?: string;
    userAvatar?: string;
    userId: number;
    userName?: string;
    userPassword?: string;
    userRole?: 'admin' | 'user';
  };

  type AdminUpdateUserResp = {
    message?: string;
    statusCode?: number;
  };

  type AdminUserDetailResp = {
    message?: string;
    statusCode?: number;
    user?: UserInfoV1;
  };

  type AdminUserListResp = {
    message?: string;
    statusCode?: number;
    total?: number;
    users?: UserInfoV1[];
  };

  type ChartInfoV0 = {
    chartCode?: string;
    chartGoal?: string;
    chartID?: number;
    chartName?: string;
    chartResult?: string;
    chartType?: string;
    updateTime?: string;
  };

  type ChartInfoV1 = {
    chartCode?: string;
    chartGoal?: string;
    chartId?: number;
    chartName?: string;
    chartResult?: string;
    chartType?: string;
    status?: string;
    updateTime?: string;
    userAccount?: string;
    userId?: number;
  };

  type CurrentUserDetailResp = {
    /** required: true */
    message?: string;
    /** required: true */
    statusCode?: number;
    userInfoV0?: UserInfoV0;
  };

  type DeleteMyChartResp = {
    message?: string;
    statusCode?: number;
  };

  type ExampleChartResp = {
    charts?: ChartInfoV0[];
    message?: string;
    statusCode?: number;
    total?: number;
  };

  type FindMyChartResp = {
    charts?: ChartInfoV0[];
    message?: string;
    statusCode?: number;
    total?: number;
  };

  type GenChartResp = {
    genChart?: string;
    genResult?: string;
    message?: string;
    statusCode?: number;
  };

  type getAdminChartDetailParams = {
    /** 图表ID */
    chartID: number;
  };

  type getAdminChartListParams = {
    keyword?: string;
    page: number;
    pageSize: number;
    userId?: number;
  };

  type getAdminLogDetailParams = {
    /** 日志ID */
    logId: number;
  };

  type getAdminLogListParams = {
    /** 页码 */
    page: number;
    /** 每页数量 */
    pageSize: number;
    /** 搜索关键词 */
    keyword?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
  };

  type getAdminUserDetailParams = {
    /** 用户ID */
    userId: number;
  };

  type getAdminUserListParams = {
    /** 页码 */
    page: number;
    /** 每页数量 */
    pageSize: number;
    /** 搜索关键词 */
    keyword?: string;
  };

  type getChartAuthFindMyChartParams = {
    chartName?: string;
    currentPage?: number;
    pageSize?: number;
    token: string;
  };

  type getUserAuthCurrentUserDetailParams = {
    token: string;
  };

  type OperationLog = {
    createTime?: string;
    id?: number;
    ip?: string;
    method?: string;
    operation?: string;
    path?: string;
    userAccount?: string;
    userId?: number;
    userName?: string;
  };

  type postUserAuthLoginOutParams = {
    token: string;
  };

  type ShareChartResp = {
    accessCode?: string;
    message?: string;
    statusCode?: number;
  };

  type UpdateChartResp = {
    message?: string;
    statusCode?: number;
  };

  type UserInfoV0 = {
    /** 创建时间 */
    createTime?: string;
    /** id */
    id?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 账号 */
    userAccount?: string;
    /** 用户头像 */
    userAvatar?: string;
    /** 用户昵称 */
    userName?: string;
    /** 用户角色：user/admin */
    userRole?: string;
  };

  type UserInfoV1 = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
    userStatus?: number;
  };

  type UserLoginOutResp = {
    /** required: true */
    message?: string;
    /** required: true */
    statusCode?: number;
  };

  type UserLoginReq = {
    account: string;
    password: string;
  };

  type UserLoginResp = {
    message?: string;
    statusCode?: number;
    token?: string;
  };

  type UserRegisterReq = {
    account: string;
    inviteCode: string;
    password: string;
  };

  type UserRegisterResp = {
    /** required: true */
    message?: string;
    /** required: true */
    statusCode?: number;
  };
}
