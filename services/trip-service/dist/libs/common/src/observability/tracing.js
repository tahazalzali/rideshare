"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTracing = initTracing;
const api_1 = require("@opentelemetry/api");
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_trace_otlp_http_1 = require("@opentelemetry/exporter-trace-otlp-http");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
let sdk;
async function initTracing(serviceName) {
    if (sdk)
        return;
    try {
        api_1.diag.setLogger(new api_1.DiagConsoleLogger(), api_1.DiagLogLevel.ERROR);
        const traceExporter = new exporter_trace_otlp_http_1.OTLPTraceExporter({
            url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || undefined,
        });
        sdk = new sdk_node_1.NodeSDK({
            traceExporter,
            resource: new resources_1.Resource({
                [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: serviceName,
            }),
        });
        await sdk.start();
    }
    catch (e) {
        console.warn('OpenTelemetry disabled:', e);
    }
}
//# sourceMappingURL=tracing.js.map