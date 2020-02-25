import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export function DateValidator(format = "DDMMYYYY"): any {
  return (control: FormControl): { [key: string]: any } => {
    if (control.value != '') {
      const val = moment(control.value, format, true);
      if (!val.isValid()) {
        return { incorrect: true };
      }
    }

    return null;
  };
}