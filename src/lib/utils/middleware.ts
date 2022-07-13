export type Middleware<MiddlewareContext> = (
  context: MiddlewareContext,
  next: () => void
) => void;

export default <MiddlewareContext = any>() => {
  const middlewares: Middleware<MiddlewareContext>[] = [];
  const use = (middleware: Middleware<MiddlewareContext>) => {
    middlewares.push(middleware);
  };
  const dispatch = (context: MiddlewareContext) => {
    const [...chain] = middlewares;
    const next = () => {
      const executor = chain.pop();
      executor?.(context, next);
    };
    next();
  };
  return [dispatch, use];
};
