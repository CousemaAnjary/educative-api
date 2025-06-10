// src/temporal/client.ts
import { Connection, WorkflowClient } from '@temporalio/client';

export const temporalClient = new WorkflowClient({
  connection: await Connection.connect({
    address: process.env.TEMPORAL_URL || 'temporal:7233',
    namespace: process.env.TEMPORAL_NAMESPACE || 'default',
  }),
});