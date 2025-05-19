import { getChartAuthFindMyChart, postChartAuthMyChartDel } from '@/services/txnbi/chart';
import { useModel } from '@@/exports';
import { Avatar, Card, Col, Descriptions, Dropdown, List, message, Modal, Row } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';

import React, { useEffect, useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  // 从全局状态中获取到当前登录的用户信息
  const { initialState } = useModel('@@initialState');

  const { currentUser } = initialState ?? {};
  const [chartList, setChartList] = useState<API.ChartInfoV0[]>();
  const [total, setTotal] = useState<number>(0);
  // 加载状态，用来控制页面是否加载，默认正在加载
  const [loading, setLoading] = useState<boolean>(true);
  // 控制删除图表的状态
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [chartRef, setChartRef] = useState(null);

  const initSearchParams = {
    // 默认第一页
    currentPage: 1,
    // 每页展示4条数据
    pageSize: 4,
    token: initialState?.token || '',
    chartName: '',
  };

  const [searchParams, setSearchParams] = useState<API.getChartAuthFindMyChartParams>({
    ...initSearchParams,
  });

  const loadData = async () => {
    // 获取数据中,还在加载中,把loading设置为true
    setLoading(true);
    try {
      const res = await getChartAuthFindMyChart(searchParams);
      if (res.statusCode === 0) {
        setChartList(res.charts ?? []);

        setTotal(res.total ?? 0);
        // 有些图表有标题,有些没有,直接把标题全部去掉
        if (res.charts) {
          res.charts.forEach((data: any) => {
            // 要把后端返回的图表字符串改为对象数组,如果后端返回空字符串，就返回'{}'
            const chartOption = JSON.parse(data.genChart ?? '{}');
            // 把标题设为undefined
            chartOption.title = undefined;
            // 然后把修改后的数据转换为json设置回去
            data.genChart = JSON.stringify(chartOption);
          });
        }
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败，' + e.message);
    }
    // 获取数据后，加载完毕，设置为false
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams, submitting]);

  // const handleDelChart()=>{
  //
  // };

  const handleCancel = () => {
    setIsOpenDetail(false);
    setChartRef(null);
  };

  const onDelete = async (e) => {
    // 如果已经是提交中的状态(还在加载)，直接返回，避免重复提交
    if (submitting) {
      return;
    }
    // 当开始提交，把submitting设置为true
    setSubmitting(true);
    // 如果提交了，把图表数据和图表代码清空掉，防止和之前提交的图标堆叠在一起
    // 如果option清空了，组件就会触发重新渲染，就不会保留之前的历史记录

    // 对接后端，上传数据
    const params = {
      chartID: parseInt(e.key, 10),
      token: initialState?.token || '',
    };
    try {
      // 需要取到上传的原始数据file→file→originFileObj(原始数据)
      console.log(params);
      const res = await postChartAuthMyChartDel({ ...params });
      // 正常情况下，如果没有返回值就分析失败，有，就分析成功
      if (res.statusCode === 1) {
        message.error('删除失败');
      } else {
        message.success('删除成功');
      }
      // 异常情况下，提示分析失败+具体失败原因
    } catch (e: any) {
      message.error('删除失败,' + e.message);
    }
    // 当结束提交，把submitting设置为false
    setSubmitting(false);
  };

  return (
    <div className="my-chart-page">
      {/* 引入搜索框 */}
      <div>
        {/*
          当用户点击搜索按钮触发 一定要把新设置的搜索条件初始化，要把页面切回到第一页;
          如果用户在第二页,输入了一个新的搜索关键词,应该重新展示第一页,而不是还在搜第二页的内容
        */}
        <Search
          placeholder="请输入图表名称"
          enterButton
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              // 原始搜索条件
              ...initSearchParams,
              // 搜索词
              chartName: value,
            });
          }}
        />
      </div>
      <div className="margin-16">
        <List
          /*
            栅格间隔16像素;xs屏幕<576px,栅格数1;
            sm屏幕≥576px，栅格数1;md屏幕≥768px,栅格数1;
            lg屏幕≥992px,栅格数2;xl屏幕≥1200px,栅格数2;
            xxl屏幕≥1600px,栅格数2
          */
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          pagination={{
            /*
              page第几页，pageSize每页显示多少条;
              当用户点击这个分页组件,切换分页时,这个组件就会去触发onChange方法,会改变咱们现在这个页面的搜索条件
            */
            onChange: (page, pageSize) => {
              // 当切换分页，在当前搜索条件的基础上，把页数调整为当前的页数
              setSearchParams({
                ...searchParams,
                currentPage: page,
                pageSize,
              });
            },
            // 显示当前页数
            current: searchParams.currentPage,
            // 页面参数改成自己的
            pageSize: searchParams.pageSize,
            // 总数设置成自己的
            total: total,
          }}
          // 设置成我们的加载状态
          loading={loading}
          dataSource={chartList}
          renderItem={(item) => (
            <div>
              <List.Item key={item.chartID}>
                {/* 用卡片包裹 */}
                <Card style={{ width: '100%' }}>
                  <Row wrap={false}>
                    <Col flex={9}>
                      <List.Item.Meta
                        // 把当前登录用户信息的头像展示出来
                        avatar={
                          <Avatar src={currentUser && currentUser.userAvatar} size={'large'} />
                        }
                        title={'图表名：' + item.chartName}
                        description={item.chartType ? '图表类型：' + item.chartType : undefined}
                      />
                    </Col>
                    <Col flex={1} push={2}>
                      <Dropdown.Button
                        key={'card-button-key' + item.chartID}
                        menu={{
                          items: [
                            {
                              // 点击按钮后修改delChartID
                              // 监听delChartID,如果改变则发送请求删除
                              // 在请求到达前，将按钮加载中状态设为true
                              key: item.chartID,
                              label: '删除',
                              onClick: onDelete,
                              loading: submitting,
                            },
                          ],
                          onClick: undefined,
                        }}
                        size={'small'}
                        onClick={() => {
                          setIsOpenDetail(true);
                        }}
                      >
                        查看详情
                      </Dropdown.Button>
                    </Col>
                  </Row>

                  {/* 在元素的下方增加16像素的外边距 */}
                  <div style={{ marginBottom: 16 }} />
                  <p>{'分析目标：' + item.chartGoal}</p>
                  {/* 在元素的下方增加16像素的外边距 */}
                  <div style={{ marginBottom: 16 }} />
                  <ReactECharts option={item.chartCode && JSON.parse(item.chartCode)} />
                  <p className={'loading-card'}>{'更新时间：' + item.updateTime}</p>
                </Card>
                <Modal
                  open={isOpenDetail}
                  onCancel={handleCancel}
                  footer={null}
                  width={1000}
                  centered={true}
                  getContainer={false}
                  afterOpenChange={(b) => {
                    if (b) {
                      const t = chartRef.getEchartsInstance();
                      t.setOption(JSON.parse(item.chartCode));
                    }
                  }}
                >
                  <Descriptions
                    layout="vertical"
                    bordered
                    column={3}
                    items={[
                      {
                        key: '1',
                        label: '图表名称',
                        children: item.chartName,
                      },
                      {
                        key: '2',
                        label: '图表类型',
                        children: item.chartType,
                      },
                      {
                        key: '5',
                        label: '更改时间',
                        children: item.updateTime,
                      },
                      {
                        key: '3',
                        label: '分析目标',
                        span: 'filled',
                        children: item.chartGoal,
                      },
                      {
                        key: '4',
                        label: '分析结果',
                        span: 'filled',
                        children: item.chartResult,
                      },
                      {
                        key: '6',
                        label: '图表',
                        span: 'filled',
                        children: (
                          <ReactECharts
                            ref={(e) => {
                              setChartRef(e);
                            }}
                            option={item.chartCode && JSON.parse(item.chartCode)}
                          />
                        ),
                      },
                    ]}
                  />
                </Modal>
              </List.Item>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default MyChartPage;
