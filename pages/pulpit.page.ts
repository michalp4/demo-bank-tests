import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  userNameText: Locator;
  transferRecieverInput: Locator;
  transferAmountInput: Locator;
  transferTitleInput: Locator;
  transferButton: Locator;
  actionCloseButton: Locator;
  messageText: Locator;
  topupRecieverInput: Locator;
  topupAmountInput: Locator;
  topupAgreementCheckbox: Locator;
  topupExecuteButton: Locator;
  moneyValueText: Locator;

  constructor(private page: Page) {
    this.userNameText = this.page.getByTestId('user-name');
    this.transferRecieverInput = this.page.locator(
      '#widget_1_transfer_receiver',
    );
    this.transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    this.transferTitleInput = this.page.locator('#widget_1_transfer_title');

    this.transferButton = this.page.getByRole('button', { name: 'wykonaj' });
    this.actionCloseButton = this.page.getByTestId('close-button');

    this.topupRecieverInput = this.page.locator('#widget_1_topup_receiver');
    this.topupAmountInput = this.page.locator('#widget_1_topup_amount');
    this.topupAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topupExecuteButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });

    this.messageText = this.page.locator('#show_messages');
    this.moneyValueText = this.page.locator('#money_value');
  }
}
