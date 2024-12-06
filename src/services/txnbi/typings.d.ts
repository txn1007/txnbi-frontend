declare namespace API {
  type ChartInfoV0 = {
    chartCode?: string;
    chartGoal?: string;
    chartID?: number;
    chartName?: string;
    chartResult?: string;
    chartType?: string;
  };

  type CurrentUserDetailResp = {
    /** required: true
example: 登陆成功 */
    message?: string;
    /** required: true
example: 0 */
    statusCode?: number;
    userInfoV0?: UserInfoV0;
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

  type getChartFindMyChartParams = {
    chartName?: string;
    currentPage?: number;
    pageSize?: number;
    token: string;
  };

  type getUserCurrentUserDetailParams = {
    token: string;
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
    password: string;
  };

  type UserRegisterResp = {
    /** required: true
example: 登陆成功 */
    message?: string;
    /** required: true
example: 0 */
    statusCode?: number;
  };
}