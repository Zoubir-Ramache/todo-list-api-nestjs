import { SequelizeModuleOptions } from "@nestjs/sequelize";
export const dbConfig:SequelizeModuleOptions={
dialect:"sqlite" , 
storage:".db/data.sqlite3" , 
autoLoadModels:true, 
synchronize:false
}