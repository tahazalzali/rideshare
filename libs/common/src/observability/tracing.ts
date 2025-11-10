// Minimal OpenTelemetry bootstrap. Safe to import even without a collector.
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

let sdk: NodeSDK | undefined;

export async function initTracing(serviceName: string) {
  if (sdk) return;
  try {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);
    const traceExporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || undefined,
    });
    sdk = new NodeSDK({
      traceExporter,
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      }),
    });
    await sdk.start();
  } catch (e) {
    // Non-fatal if tracing cannot start
    // eslint-disable-next-line no-console
    console.warn('OpenTelemetry disabled:', e);
  }
}
