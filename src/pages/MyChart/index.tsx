import { getChartFindMyChart } from '@/services/txnbi/chart';
import { useModel } from '@@/exports';
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Dropdown,
  List,
  MenuProps,
  message,
  Modal,
  Row,
} from 'antd';
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

  const [isOpenDetail, setIsOpenDetail] = React.useState(false);

  const [chartRef, setChartRef] = useState(null);

  const initSearchParams = {
    // 默认第一页
    currentPage: 1,
    // 每页展示4条数据
    pageSize: 4,
    token: initialState?.token || '',
    chartName: '',
  };

  const [searchParams, setSearchParams] = useState<API.getChartFindMyChartParams>({
    ...initSearchParams,
  });

  const loadData = async () => {
    // 获取数据中,还在加载中,把loading设置为true
    setLoading(true);
    try {
      const res = await getChartFindMyChart(searchParams);
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
  }, [searchParams]);

  const onMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const items = [
    {
      key: 'deleteChart',
      label: '删除',
    },
  ];

  const handleCancel = () => {
    setIsOpenDetail(false);
    setChartRef(null);
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
                        menu={{ items, onClick: onMenuClick }}
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
