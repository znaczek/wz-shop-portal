import {OptionInterface} from '../interface/option.interface';

export class SelectUtils {

  public static getOptionsFromArray(inputArray: Array<string | number>): OptionInterface[] {
    return inputArray.map((value) => ({
      value,
      label: value.toString(),
    }));
  }

}
