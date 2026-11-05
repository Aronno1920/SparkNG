import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

// prettier-ignore
const originalData = [
  [3.275154, 2.957587],
  [-3.344465, 2.603513],
  [0.355083, -3.376585],
  [1.852435, 3.547351],
  [-2.078973, 2.552013],
  [-0.993756, -0.884433],
  [2.682252, 4.007573],
  [-3.087776, 2.878713],
  [-1.565978, -1.256985],
  [2.441611, 0.444826],
  [-0.659487, 3.111284],
  [-0.459601, -2.618005],
  [2.17768, 2.387793],
  [-2.920969, 2.917485],
  [-0.028814, -4.168078],
  [3.625746, 2.119041],
  [-3.912363, 1.325108],
  [-0.551694, -2.814223],
  [2.855808, 3.483301],
  [-3.594448, 2.856651],
  [0.421993, -2.372646],
  [1.650821, 3.407572],
  [-2.082902, 3.384412],
  [-0.718809, -2.492514],
  [4.513623, 3.841029],
  [-4.822011, 4.607049],
  [-0.656297, -1.449872],
  [1.919901, 4.439368],
  [-3.287749, 3.918836],
  [-1.576936, -2.977622],
  [3.598143, 1.97597],
  [-3.977329, 4.900932],
  [-1.79108, -2.184517],
  [3.914654, 3.559303],
  [-1.910108, 4.166946],
  [-1.226597, -3.317889],
  [1.148946, 3.345138],
  [-2.113864, 3.548172],
  [0.845762, -3.589788],
  [2.629062, 3.535831],
  [-1.640717, 2.990517],
  [-1.881012, -2.485405],
  [4.606999, 3.510312],
  [-4.366462, 4.023316],
  [0.765015, -3.00127],
  [3.121904, 2.173988],
  [-4.025139, 4.65231],
  [-0.559558, -3.840539],
  [4.376754, 4.863579],
  [-1.874308, 4.032237],
  [-0.089337, -3.026809],
  [3.997787, 2.518662],
  [-3.082978, 2.884822],
  [0.845235, -3.454465],
  [1.327224, 3.358778],
  [-2.889949, 3.596178],
  [-0.966018, -2.839827],
  [2.960769, 3.079555],
  [-3.275518, 1.577068],
  [0.639276, -3.41284]
];

const DIM_CLUSTER_INDEX = 2;
const DATA_DIM_IDX = [0, 1];
const CENTER_DIM_IDX = [3, 4];

// Hierarchical k-means (divisive): each step splits the cluster with the
// largest error sum of squares, reproducing the ecStat
// clustering.hierarchicalKMeans stepByStep generator.
function hierarchicalKMeansSteps(data: number[][], clusterCount: number) {
    const steps: { data: number[][]; centroids: number[][] }[] = [];

    function sse(points: number[][]) {
        if (!points.length) return 0;
        let sx = 0;
        let sy = 0;
        points.forEach((p) => {
            sx += p[0];
            sy += p[1];
        });
        const cx = sx / points.length;
        const cy = sy / points.length;
        return points.reduce((sum, p) => sum + Math.pow(p[0] - cx, 2) + Math.pow(p[1] - cy, 2), 0);
    }

    function kMeans2(points: number[][]) {
        // deterministic init: the two most distant points
        let a = points[0];
        let b = points[1];
        let maxDist = -1;
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const d = Math.pow(points[i][0] - points[j][0], 2) + Math.pow(points[i][1] - points[j][1], 2);
                if (d > maxDist) {
                    maxDist = d;
                    a = points[i];
                    b = points[j];
                }
            }
        }
        let c1 = [a[0], a[1]];
        let c2 = [b[0], b[1]];
        let assign: number[] = [];
        for (let iter = 0; iter < 20; iter++) {
            assign = points.map((p) => (Math.pow(p[0] - c1[0], 2) + Math.pow(p[1] - c1[1], 2) <= Math.pow(p[0] - c2[0], 2) + Math.pow(p[1] - c2[1], 2) ? 0 : 1));
            const g0 = points.filter((_, i) => assign[i] === 0);
            const g1 = points.filter((_, i) => assign[i] === 1);
            if (!g0.length || !g1.length) break;
            c1 = [g0.reduce((s, p) => s + p[0], 0) / g0.length, g0.reduce((s, p) => s + p[1], 0) / g0.length];
            c2 = [g1.reduce((s, p) => s + p[0], 0) / g1.length, g1.reduce((s, p) => s + p[1], 0) / g1.length];
        }
        return { assign, c1, c2 };
    }

    // clusters[i] = indices of originalData rows in cluster i
    let clusters: number[][] = [data.map((_, i) => i)];
    steps.push({ data: data.map((p) => [p[0], p[1], 0]), centroids: [] });

    while (clusters.length < clusterCount) {
        // pick cluster with the largest SSE
        let target = -1;
        let targetSSE = -1;
        clusters.forEach((cl, i) => {
            const e = sse(cl.map((idx) => data[idx]));
            if (e > targetSSE && cl.length >= 2) {
                targetSSE = e;
                target = i;
            }
        });
        if (target < 0) break;
        const points = clusters[target].map((idx) => data[idx]);
        const { assign, c1, c2 } = kMeans2(points);
        const oldCluster = clusters[target];
        const newCluster = oldCluster.filter((rowIdx, k) => assign[k] === 1);
        clusters[target] = oldCluster.filter((rowIdx, k) => assign[k] === 0);
        clusters.push(newCluster);

        // rows layout: [x, y, clusterIndex, centerX, centerY]
        const rows: number[][] = data.map((p) => [p[0], p[1], 0, 0, 0]);
        const centroids: number[][] = [];
        clusters.forEach((cl, ci) => {
            const cx = cl.reduce((s, idx) => s + data[idx][0], 0) / cl.length;
            const cy = cl.reduce((s, idx) => s + data[idx][1], 0) / cl.length;
            centroids.push([cx, cy]);
            cl.forEach((idx) => {
                rows[idx][DIM_CLUSTER_INDEX] = ci;
                rows[idx][CENTER_DIM_IDX[0]] = cx;
                rows[idx][CENTER_DIM_IDX[1]] = cy;
            });
        });
        steps.push({ data: rows, centroids });
    }
    return steps;
}

const CLUSTER_COUNT = 6;

const steps = hierarchicalKMeansSteps(originalData, CLUSTER_COUNT);

const colorAll = ['#bbb', '#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF'];
const ANIMATION_DURATION_UPDATE = 1500;

let targetRenderProgress = 0;

function renderItemPoint(params: any, api: any) {
    const coord = api.coord([api.value(0), api.value(1)]);
    let clusterIdx = api.value(2);
    if (clusterIdx == null || isNaN(clusterIdx)) {
        clusterIdx = 0;
    }
    const isNewCluster = clusterIdx === api.value(3);

    const extra = {
        transition: []
    };
    const contentColor = colorAll[clusterIdx];

    return {
        type: 'circle',
        x: coord[0],
        y: coord[1],
        shape: {
            cx: 0,
            cy: 0,
            r: 10
        },
        extra: extra,
        style: {
            fill: contentColor,
            stroke: '#333',
            lineWidth: 1,
            shadowColor: contentColor,
            shadowBlur: isNewCluster ? 12 : 0,
            transition: ['shadowBlur', 'fill']
        }
    };
}

function renderBoundary(params: any, api: any) {
    const xVal = api.value(0);
    const yVal = api.value(1);
    const maxDist = api.value(2);
    const center = api.coord([xVal, yVal]);
    const size = api.size([maxDist, maxDist]);

    return {
        type: 'ellipse',
        shape: {
            cx: isNaN(center[0]) ? 0 : center[0],
            cy: isNaN(center[1]) ? 0 : center[1],
            rx: isNaN(size[0]) ? 0 : size[0] + 15,
            ry: isNaN(size[1]) ? 0 : size[1] + 15
        },
        extra: {
            renderProgress: ++targetRenderProgress,
            enterFrom: {
                renderProgress: 0
            },
            transition: 'renderProgress'
        },
        style: {
            fill: null,
            stroke: 'rgba(0,0,0,0.2)',
            lineDash: [4, 4],
            lineWidth: 4
        }
    };
}

function makeStepOption(option: any, data: number[][], centroids?: number[][]) {
    const newCluIdx = centroids ? centroids.length - 1 : -1;
    let maxDist = 0;
    for (let i = 0; i < data.length; i++) {
        const line = data[i];
        if (line[DIM_CLUSTER_INDEX] === newCluIdx) {
            const dist0 = Math.pow(line[DATA_DIM_IDX[0]] - line[CENTER_DIM_IDX[0]], 2);
            const dist1 = Math.pow(line[DATA_DIM_IDX[1]] - line[CENTER_DIM_IDX[1]], 2);
            maxDist = Math.max(maxDist, dist0 + dist1);
        }
    }
    const boundaryData = centroids ? [[centroids[newCluIdx][0], centroids[newCluIdx][1], Math.sqrt(maxDist)]] : [];

    option.options.push({
        series: [
            {
                type: 'custom',
                encode: {
                    tooltip: [0, 1]
                },
                renderItem: renderItemPoint,
                data: data
            },
            {
                type: 'custom',
                renderItem: renderBoundary,
                animationDuration: 3000,
                silent: true,
                data: boundaryData
            }
        ]
    });
}

@Component({
    selector: 'clustering-process-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Step-by-step hierarchical k-means clustering: drag the vertical timeline to watch each split glow as a new cluster and its dashed boundary ellipse appear.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ClusteringProcessDoc {
    option: any = {
        timeline: {
            top: 'center',
            right: 50,
            height: 300,
            width: 10,
            inverse: true,
            autoPlay: false,
            playInterval: 2500,
            symbol: 'none',
            orient: 'vertical',
            axisType: 'category',
            label: {
                formatter: 'step {value}',
                position: 10
            },
            checkpointStyle: {
                animationDuration: ANIMATION_DURATION_UPDATE
            },
            data: []
        },
        baseOption: {
            animationDurationUpdate: ANIMATION_DURATION_UPDATE,
            transition: ['shape'],
            tooltip: {},
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    type: 'scatter'
                }
            ]
        },
        options: []
    };

    constructor() {
        makeStepOption(this.option, originalData);
        this.option.timeline.data.push('0');
        for (let i = 1; i < steps.length; i++) {
            makeStepOption(
                this.option,
                steps[i].data.map((row) => [...row]),
                steps[i].centroids.map((c) => [...c])
            );
            this.option.timeline.data.push(i + '');
        }
    }

    options = this.option;
}
