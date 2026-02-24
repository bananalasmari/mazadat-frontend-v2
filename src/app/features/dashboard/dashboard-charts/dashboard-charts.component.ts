import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import type { EChartsOption } from 'echarts';

const CHART_COLORS = ['#24205b', '#3d3891', '#5852c4', '#7c76d9', '#a39eeb', '#9ca3af'];
const CHART_FONT_FAMILY = 'Elm';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [TypographyComponent],
  templateUrl: './dashboard-charts.component.html',
})
export class DashboardChartsComponent {
  private readonly i18n = inject(TranslationService);
  private readonly destroyRef = inject(DestroyRef);

  private pieChartRef = viewChild<ElementRef<HTMLDivElement>>('pieChartRef');
  private barChartRef = viewChild<ElementRef<HTMLDivElement>>('barChartRef');

  private pieChart: ECharts | null = null;
  private barChart: ECharts | null = null;
  private pieChartElement: HTMLDivElement | null = null;
  private barChartElement: HTMLDivElement | null = null;

  readonly pieTitle = () => this.i18n.t('dashboard.charts.mostSoldCarsTitle');
  readonly pieSubtitle = () => this.i18n.t('dashboard.charts.mostSoldCarsSubtitle');
  readonly barTitle = () => this.i18n.t('dashboard.charts.salesPerformanceTitle');
  readonly barSubtitle = () => this.i18n.t('dashboard.charts.salesPerformanceSubtitle');

  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.syncPieChart();
        this.syncBarChart();
      }, 0);
    });

    effect(() => {
      this.i18n.lang();
      if (this.pieChart) this.pieChart.setOption(this.buildPieOption());
      if (this.barChart) this.barChart.setOption(this.buildBarOption());
    });

    effect(() => {
      this.pieChartRef();
      this.barChartRef();
      this.syncPieChart();
      this.syncBarChart();
    });

    window.addEventListener('resize', this.onResize);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', this.onResize);
      this.pieChart?.dispose();
      this.barChart?.dispose();
    });
  }

  private onResize = (): void => {
    this.pieChart?.resize();
    this.barChart?.resize();
  };

  private syncPieChart(): void {
    const el = this.pieChartRef()?.nativeElement;
    if (!el) return;
    if (el !== this.pieChartElement) {
      this.pieChart?.dispose();
      this.pieChart = null;
      this.pieChartElement = el;
      this.pieChart = echarts.init(el);
    }
    this.pieChart?.setOption(this.buildPieOption());
    this.pieChart?.resize();
  }

  private syncBarChart(): void {
    const el = this.barChartRef()?.nativeElement;
    if (!el) return;
    if (el !== this.barChartElement) {
      this.barChart?.dispose();
      this.barChart = null;
      this.barChartElement = el;
      this.barChart = echarts.init(el);
    }
    this.barChart?.setOption(this.buildBarOption());
    this.barChart?.resize();
  }

  private buildPieOption(): EChartsOption {
    const t = (key: string) => this.i18n.t(key);
    return {
      color: CHART_COLORS,
      textStyle: { fontFamily: CHART_FONT_FAMILY },
      tooltip: { trigger: 'item', textStyle: { fontFamily: CHART_FONT_FAMILY } },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: { fontFamily: CHART_FONT_FAMILY },
        data: [
          t('dashboard.charts.brandAudi'),
          t('dashboard.charts.brandPorsche'),
          t('dashboard.charts.brandBmw'),
          t('dashboard.charts.brandLexus'),
          t('dashboard.charts.brandMercedes'),
          t('dashboard.charts.brandOther'),
        ],
      },
      series: [
        {
          name: t('dashboard.charts.mostSoldCarsTitle'),
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 4 },
          label: { show: false },
          data: [
            { value: 28, name: t('dashboard.charts.brandAudi') },
            { value: 22, name: t('dashboard.charts.brandPorsche') },
            { value: 18, name: t('dashboard.charts.brandBmw') },
            { value: 14, name: t('dashboard.charts.brandLexus') },
            { value: 12, name: t('dashboard.charts.brandMercedes') },
            { value: 6, name: t('dashboard.charts.brandOther') },
          ],
        },
      ],
    };
  }

  private buildBarOption(): EChartsOption {
    const t = (key: string) => this.i18n.t(key);
    return {
      color: ['#24205b'],
      textStyle: { fontFamily: CHART_FONT_FAMILY },
      tooltip: { trigger: 'axis', textStyle: { fontFamily: CHART_FONT_FAMILY } },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: [
          t('dashboard.charts.monthJan'),
          t('dashboard.charts.monthFeb'),
          t('dashboard.charts.monthMar'),
          t('dashboard.charts.monthApr'),
          t('dashboard.charts.monthMay'),
          t('dashboard.charts.monthJun'),
        ],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#6b7280', fontFamily: CHART_FONT_FAMILY },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#6b7280', fontFamily: CHART_FONT_FAMILY },
        min: 0,
        max: 80000,
        interval: 20000,
      },
      series: [
        {
          name: this.i18n.t('dashboard.charts.salesPerformanceSubtitle'),
          type: 'bar',
          barWidth: '50%',
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          data: [48000, 55000, 52000, 65000, 58000, 72000],
        },
      ],
    };
  }
}
