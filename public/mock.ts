import mockData from './mockData';

/**
 * mock 数据, 模拟传给组件的 props
 */
export const initState = {
  customProps: {
    viewConfig: {
      mockData,
    },
    advancedConfig: {},
    globalConfig: {
      advancedResult: {
        summarizeResults: [],
        trendLineResults: [],
        anomalyDetectionResults: [],
        forecastResults: [],
        clusteringResults: [],
      },
      annotationResult: {
        measureThresholdResults: [],
        inflectionPointAnnotationResults: [],
      },
      isDrill: false,
      relationDim: null,
      relationType: 'x',
      env: ['pc'],
      renderMode: 'edit',
    },
  },
};
