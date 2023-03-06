import isEmpty from 'lodash/isEmpty';
import defineTrigger from '../../../../helpers/define-trigger';
import { triggerArguments } from '../../actions/arguments';

export default defineTrigger({
  name: 'Item created',
  key: 'itemCreated',
  type: 'webhook',
  description: 'Triggers when a new item is created.',
  arguments: triggerArguments,

  async testRun($) {
    const computedWebhookEvent = {
      event: {
        userId: 1234567,
        originalTriggerUuid: null as 'string',
        boardId: 1142258169,
        pulseId: 1147351931,
        pulseName: 'Create_item webhook',
        groupId: 'group',
        groupName: 'Group Title',
        groupColor: '#579bfc',
        isTopGroup: true,
        columnValues: {},
        app: 'monday',
        type: 'create_pulse',
        triggerTime: '2021-10-11T09:07:28.210Z',
        subscriptionId: 12345678,
        triggerUuid: 'b5ed2e17c530f43668de130142445cba',
      },
    };

    const dataItem = {
      raw: computedWebhookEvent,
      meta: {
        internalId: `${computedWebhookEvent.event.subscriptionId}`,
      },
    };

    $.pushTriggerItem(dataItem);
  },

  async registerHook($) {
    const event = 'create_item';
    const board = $.step.parameters.board;
    const url = $.webhookUrl;

    const query = `mutation { create_webhook (board_id: ${board}, url: "${url}", event: ${event}) { id } }`;
    const { data } = await $.http.post('/', { query });

    await $.flow.setRemoteWebhookId(data.create_webhook.id);
  },

  async unregisterHook($) {
    const id = $.flow.remoteWebhookId;
    const query = `mutation { delete_webhook (id: ${id}) { id } }`;

    await $.http.post('/', { query });
  },
});
