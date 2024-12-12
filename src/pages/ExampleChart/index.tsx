import { getChartExampleChart } from '@/services/txnbi/chart';
import { Avatar, Card, Col, Descriptions, Dropdown, List, message, Modal, Row } from 'antd';
import ReactECharts from 'echarts-for-react';

import React, { useEffect, useState } from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const ExampleChart: React.FC = () => {
  const [chartList, setChartList] = useState<API.ChartInfoV0[]>();
  // 加载状态，用来控制页面是否加载，默认正在加载
  const [loading, setLoading] = useState<boolean>(true);
  // 控制删除图表的状态
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const [chartRef, setChartRef] = useState(null);

  const loadData = async () => {
    // 获取数据中,还在加载中,把loading设置为true
    setLoading(true);
    try {
      const res = await getChartExampleChart();
      if (res.statusCode === 0) {
        setChartList(res.charts ?? []);

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
        message.error('获取示例图表失败');
      }
    } catch (e: any) {
      console.log(e);
      message.error('获取示例图表失败，' + e.message);
    }
    // 获取数据后，加载完毕，设置为false
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // const handleDelChart()=>{
  //
  // };

  const handleCancel = () => {
    setIsOpenDetail(false);
    setChartRef(null);
  };

  return (
    <div className="my-chart-page">
      {/* 引入搜索框 */}
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
                          <Avatar
                            src={
                              'https://tiktokk-1331222828.cos.ap-guangzhou.myqcloud.com/avatar/avatar-tem.jpg'
                            }
                            size={'large'}
                          />
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
                              key: 'example-delete-button',
                              label: '删除',
                              disabled: true,
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
export default ExampleChart;
