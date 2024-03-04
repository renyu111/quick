/**
 * 自定义组件
 */
import * as echarts from 'echarts';
import { Interfaces, I18n } from 'bi-open-sdk';
import './index.scss';

class MyComponent {
  chart: echarts.ECharts;
  lastSize: {
    width: number;
    height: number;
  };

  setOption(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    if (this.chart) {
      const {
        customProps: {
          viewConfig: { mockData },
        },
      } = props;

      // const customProps = props.customProps;

      // const data = customProps.data;
      // const dataConfig = customProps.dataConfig;
      // const viewConfig = customProps.viewConfig;
      // const fieldSettingMap = viewConfig.fieldSettingMap;
      // const formatAllGranularityTime = customProps?.utils?.formatAllGranularityTime;
      // const formatNumberWithConfig = customProps?.utils?.formatNumberWithConfig;

      // 绘制图表
      this.chart.setOption({
        tooltip: {},
        legend: {
          data: mockData.categories.map(({ name }: { name: string }) => name),
        },
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: mockData.nodes,
            links: mockData.links,
            categories: mockData.categories,
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}',
            },
            // labelLayout: {
            // hideOverlap: true,
            // },
            scaleLimit: {
              min: 0.4,
              max: 2,
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
          },
        ],
      });
    }
  }

  /**
   * 绑定事件
   * @param props
   */
  bindEvents(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const customProps = props.customProps;
    const dispatch = customProps.dispatch;
    if (typeof dispatch === 'function') {
      // 下钻/联动/跳转事件
      this.chart.on('click', (serie: any) => {
        dispatch({
          type: 'select',
          payload: {
            dataIndex: serie.dataIndex, // dataIndex 为所点击的行在 data 中的数组下标
          },
        });
      });

      // 点击空白处事件, 用于适配移动端下钻
      // @ts-ignore
      this.chart.getZr().on('click', function (e) {
        if (!e.target) {
          dispatch({
            type: 'cancelSelect',
          });
        }
      });
    }
  }

  /**
   * 保存上次大小, 用于性能优化
   */
  setLastSize(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    const width = props.container.offsetWidth;
    const height = props.container.offsetHeight;
    // 容器大小变更时触发 resize
    if (this.lastSize && (this.lastSize?.width !== width || this.lastSize?.height !== height)) {
      this.chart.resize();
    }
    this.lastSize = {
      width,
      height,
    };
  }

  /**
   * mount 生命周期, 在渲染时触发
   */
  mount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    props.container.classList.add('test-component');
    if (!echarts) {
      props.container.textContent = '无法获取 echarts, 请确保已经配置并加载了 echarts.js';
      return;
    }
    this.chart = echarts.init(props.container as HTMLDivElement);

    // this.bindEvents(props);
    this.setOption(props);
    this.setLastSize(props);
  }

  /**
   * update 生命周期, 在更新时触发
   */
  update(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log(props);

    if (props.customProps.viewConfig.display.showLegend) {
      this.setOption(props);
      this.setLastSize(props);
    } else {
      this.chart?.clear();
    }
  }

  /**
   * umount 生命周期, 在卸载时触发
   */
  umount(props: Interfaces.LifecycleProps<Interfaces.ComponentProps>) {
    console.log('trigger when component unmount');
  }
}

export default MyComponent;
