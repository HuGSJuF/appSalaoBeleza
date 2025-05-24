declare module 'react-native-sqlite-storage' {
  export interface SQLiteDatabase {
    executeSql: (
      sqlStatement: string,
      args?: any[]
    ) => Promise<[ResultSet]>;
    transaction: (
      callback: (tx: Transaction) => void
    ) => Promise<void>;
    close: () => Promise<void>;
  }

  export interface ResultSet {
    rows: {
      length: number;
      item: (index: number) => any;
      _array: any[];
    };
    rowsAffected: number;
    insertId?: number;
  }

  export interface Transaction {
    executeSql: (
      sqlStatement: string,
      args?: any[],
      callback?: (tx: Transaction, resultSet: ResultSet) => void,
      errorCallback?: (tx: Transaction, error: any) => void
    ) => void;
  }

  export function openDatabase(
    params:
      | { name: string; location: 'default' }
      | string,
    successCallback?: () => void,
    errorCallback?: (error: any) => void
  ): SQLiteDatabase;

  export function deleteDatabase(
    params: { name: string; location: 'default' },
    successCallback?: () => void,
    errorCallback?: (error: any) => void
  ): void;

  export function enablePromise(enable: boolean): void;
}
