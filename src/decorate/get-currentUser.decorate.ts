//tạo decorator @GetUser để tiện lợi trong việc lấy thông tin người dùng hiện tại từ request object( khi mở rộng code các endpoint sẽ được bảo vệ = Jwt )
//dễ dàng truy xuất thông tin người dùng từ request trong bất kỳ handler nào mà không cần phải lặp lại mã code nhiều lần
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
