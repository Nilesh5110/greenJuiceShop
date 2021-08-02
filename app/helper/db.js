import React from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("JuiceBar.db");
// Main Variety ...................................................................
export const main_Variety_table = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS main_Variety5(main_variety_id INTEGER PRIMARY KEY NOT NULL,name varchar(50) not null,image VARCHAR2(500),color VARCHAR2(10), status VARCHAR2(5) not null default true);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const Insert_Main_Variety = (name, image, color) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO main_Variety5(name,image,color) VALUES (?,?,?);`,
        [name, image, color],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateSelectedMainVariety = (status, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE main_Variety5 SET status=? WHERE main_variety_id = ?`,
        [status, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const select_All_Main_Variety = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM main_Variety5`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteSelectedMainVariety = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM main_Variety5 WHERE main_variety_id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// Sub Variety ...................................................................
export const sub_Variety_table = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sub_Variety2(sub_variety_id INTEGER PRIMARY KEY NOT NULL,main_variety_id INTEGER, name varchar(50) not null,image VARCHAR2(500),L_cup_Price VARCHAR2(5),M_cup_Price VARCHAR2(5), status varchar(5), foreign key(main_variety_id) references main_Variety4(main_variety_id ) );",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const Insert_Sub_Variety = (
  main_variety_id,
  name,
  image,
  L_cup_Price,
  M_cup_Price,
  status = "true"
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO sub_Variety2(main_variety_id,name,image,L_cup_Price,M_cup_Price,status) VALUES (?,?,?,?,?,?);`,
        [main_variety_id, name, image, L_cup_Price, M_cup_Price, status],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const select_All_Sub_Variety = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM sub_Variety2`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteSelected_SubVariety = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM sub_Variety2 WHERE sub_variety_id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// All Orders Table .............................................................

export const each_Order_Table = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS All_Order_Table3(main_id INTEGER PRIMARY KEY NOT NULL,Today_Date varchar(10),User varchar(5),Item_id INTEGER,cupSize varchar(5),numberOfCups INTEGER,totalAmount INTEGER,payment_Type varchar(10));",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const Insert_each_Order = (
  Today_Date,
  User,
  Item_id,
  cupSize,
  numberOfCups,
  totalAmount,
  payment_Type
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO All_Order_Table3(Today_Date,User,Item_id,cupSize,numberOfCups,totalAmount,payment_Type) VALUES (?,?,?,?,?,?,?);`,
        [
          Today_Date,
          User,
          Item_id,
          cupSize,
          numberOfCups,
          totalAmount,
          payment_Type,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const select_each_order = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT Today_Date,cupSize,numberOfCups,payment_Type,totalAmount,(SELECT name FROM sub_Variety2 s WHERE sub_variety_id = Item_id) AS name FROM All_Order_Table3`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
// Order Table...................................................................

export const order_Table = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS order_Table(order_no number(10), order_Date date,year_cd VARCHAR2(5) ,sub_variety_id number(10),qty number(10),glass_type VARCHAR2(10),price VARCHAR2(10), total_price varchar(10), pay_type VARCHAR2(10), constraint order_no_P_Key primary key (order_no), foreign key(sub_variety_id) references sub_Variety(sub_variety_id  ) );",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

//  taking Order ...................................................................
export const taking_order_table = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS taking_order_table4(order_id INTEGER PRIMARY KEY NOT NULL ,variety_id number(10),name varchar(50), glass_size varchar(10),glass_price number(5),total_glass number(5),total_amount number(20));",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const taking_order_table_insert = (
  variety_id,
  name,
  glass_size,
  glass_price,
  total_glass,
  total_amount
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO taking_order_table4(variety_id,name,glass_size,glass_price,total_glass,total_amount) VALUES (?,?,?,?,?,?);`,
        [variety_id, name, glass_size, glass_price, total_glass, total_amount],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const taking_All_order = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM taking_order_table4`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateSelectedOrder = (total_glass, total_amount, id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE taking_order_table4 SET total_glass=?, total_amount=? WHERE order_id = ?`,
        [total_glass, total_amount, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const deleteSelectedOrder = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM taking_order_table4 WHERE order_id = ?`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
