import { Worker } from 'bullmq';
import redisConfig from '../config/redis';
import logger from '../helpers/logger';
import Step from '../models/step';
import actionQueue from '../queues/action';
import { processAction } from '../services/action';
import {
  REMOVE_AFTER_30_DAYS_OR_150_JOBS,
  REMOVE_AFTER_7_DAYS_OR_50_JOBS,
} from '../helpers/remove-job-configuration';
import delayAsMilliseconds from '../helpers/delay-as-milliseconds';

type JobData = {
  flowId: string;
  executionId: string;
  stepId: string;
};

const DEFAULT_DELAY_DURATION = 0;

export const worker = new Worker(
  'action',
  async (job) => {
    const { stepId, flowId, executionId, computedParameters, executionStep } = await processAction(
      job.data as JobData
    );

    const step = await Step.query().findById(stepId).throwIfNotFound();
    const nextStep = await step.getNextStep();

    if (!nextStep) return;

    const jobName = `${executionId}-${nextStep.id}`;

    const jobPayload = {
      flowId,
      executionId,
      stepId: nextStep.id,
    };

    const jobOptions = {
      removeOnComplete: REMOVE_AFTER_7_DAYS_OR_50_JOBS,
      removeOnFail: REMOVE_AFTER_30_DAYS_OR_150_JOBS,
      delay: DEFAULT_DELAY_DURATION,
    };

    if (step.appKey === 'delay') {
      jobOptions.delay = delayAsMilliseconds(step.key, computedParameters);
    }

    if (step.appKey === 'filter' && !executionStep.dataOut) {
      return;
    }

    await actionQueue.add(jobName, jobPayload, jobOptions);
  },
  { connection: redisConfig }
);

worker.on('completed', (job) => {
  logger.info(`JOB ID: ${job.id} - FLOW ID: ${job.data.flowId} has started!`);
});

worker.on('failed', (job, err) => {
  logger.info(
    `JOB ID: ${job.id} - FLOW ID: ${job.data.flowId} has failed to start with ${err.message}`
  );
});

process.on('SIGTERM', async () => {
  await worker.close();
});
