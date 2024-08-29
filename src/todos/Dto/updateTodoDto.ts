import { CreateTodoDto } from "./createTodoDto";
import { PartialType } from "@nestjs/swagger";
export class UpdateTodoDto extends PartialType(CreateTodoDto){}