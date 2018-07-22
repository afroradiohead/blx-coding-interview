import {Component} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

interface IInputCashflow {
  date: string;
  amount: string;
}

interface IOutputCashflow extends IInputCashflow {
  PV: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputCashflowList: IInputCashflow[] = [{
    date: '1/1/2019',
    amount: '-5000'
  }, {
    date: '1/1/2020',
    amount: '1000'
  }, {
    date: '1/1/2021',
    amount: '1000'
  }, {
    date: '1/1/2022',
    amount: '1000'
  }, {
    date: '1/1/2023',
    amount: '4000'
  }, ];
  outputCashflowList: IOutputCashflow[] =  [];
  netPV: 0;
  formGroup = new FormGroup({
    discountRate: new FormControl(5, [Validators.max(100)]),
    analysisDate: new FormControl(moment('4/1/2018').toDate())
  });

  onFormSubmit() {
    this.outputCashflowList = this.inputCashflowList
      .filter(inputCashFlow => {
        return !_.isEmpty(inputCashFlow.date) && moment(inputCashFlow.date).isValid() && _.isNumber(parseFloat(inputCashFlow.amount));
      })
      .map(inputCashFlow => this._generateOutputCashFlow(inputCashFlow));
    this.netPV = _.sumBy(this.outputCashflowList, cashFlow => parseFloat(cashFlow.PV));
  }

  private _generateOutputCashFlow(cashFlow: IInputCashflow): IOutputCashflow {
    const analysisDate = this.formGroup.controls['analysisDate'].value;
    const discountRateInPercentage = parseFloat(this.formGroup.controls['discountRate'].value) / 100;
    const daysBetweenCashFlowAndAnalysisDate = moment(cashFlow.date).diff(analysisDate, 'days');

    return {
      date: cashFlow.date,
      amount: cashFlow.amount,
      PV: (parseFloat(cashFlow.amount) / (Math.pow(1 + discountRateInPercentage, daysBetweenCashFlowAndAnalysisDate / 365))).toString()
    };
  }

}
