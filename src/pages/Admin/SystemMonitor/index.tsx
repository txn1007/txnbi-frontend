import { ApiOutlined, ClockCircleOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic, Tabs } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
// import { getSystemStats, getSystemTrend } from '@/services/txnbi/admin';

const { TabPane } = Tabs;

const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState<API.SystemStats>({});
  const [userTrend, setUserTrend] = useState<API.TrendData[]>([]);
  const [chartTrend, setChartTrend] = useState<API.TrendData[]>([]);
  const [apiTrend, setApiTrend] = useState<API.TrendData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 获取系统统计数据
        const statsResult = await getSystemStats();
        if (statsResult.code === 0) {
          setStats(statsResult.data || {});
        }

        // 获取用户趋势数据
        const userTrendResult = await getSystemTrend({ type: 'user', days: 7 });
        if (userTrendResult.code === 0) {
          setUserTrend(userTrendResult.data || []);
        }

        // 获取图表趋势数据
        const chartTrendResult = await getSystemTrend({ type: 'chart', days: 7 });
        if (chartTrendResult.code === 0) {
          setChartTrend(chartTrendResult.data || []);
        }

        // 获取API调用趋势数据
        const apiTrendResult = await getSystemTrend({ type: 'api', days: 7 });
        if (apiTrendResult.code === 0) {
          setApiTrend(apiTrendResult.data || []);
        }
      } catch (error) {
        console.error('获取系统监控数据失败', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // 每5分钟刷新一次数据
    const timer = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // 用户趋势图配置
  const getUserOption = () => {
    return {
      title: {
        text: '用户增长趋势',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: userTrend.map((item) => item.date),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '新增用户',
          type: 'line',
          data: userTrend.map((item) => item.value),
          smooth: true,
        },
      ],
    };
  };

  // 图表生成趋势图配置
  const getChartOption = () => {
    return {
      title: {
        text: '图表生成趋势',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: chartTrend.map((item) => item.date),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '生成图表数',
          type: 'bar',
          data: chartTrend.map((item) => item.value),
        },
      ],
    };
  };

  // API调用趋势图配置
  const getApiOption = () => {
    return {
      title: {
        text: 'API调用趋势',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: apiTrend.map((item) => item.date),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'API调用次数',
          type: 'line',
          data: apiTrend.map((item) => item.value),
          areaStyle: {},
        },
      ],
    };
  };

  return (
    <PageContainer>
      <Row gutter={16} className="margin-16">
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={stats.totalUsers || 0}
              prefix={<UserOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总图表数"
              value={stats.totalCharts || 0}
              prefix={<FileOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日API调用"
              value={stats.todayApiCalls || 0}
              prefix={<ApiOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均响应时间"
              value={stats.avgResponseTime || 0}
              suffix="ms"
              prefix={<ClockCircleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Card className="margin-16">
        <Tabs defaultActiveKey="1">
          <TabPane tab="用户趋势" key="1">
            <ReactECharts option={getUserOption()} style={{ height: 400 }} />
          </TabPane>
          <TabPane tab="图表趋势" key="2">
            <ReactECharts option={getChartOption()} style={{ height: 400 }} />
          </TabPane>
          <TabPane tab="API调用" key="3">
            <ReactECharts option={getApiOption()} style={{ height: 400 }} />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default SystemMonitor;
