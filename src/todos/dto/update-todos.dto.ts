import { PartialType } from "@nestjs/swagger";
import { CreateTodosDto } from "./create-todos.dto";
export class updateTodoDto extends PartialType(CreateTodosDto){}