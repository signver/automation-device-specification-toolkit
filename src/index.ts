import createChain from '@signver/handle-chain';

type ADSContext = {
  readonly request: {};
  readonly response: {};
  state: Record<string | number, any>;
};

const adsHandler = createChain<ADSContext>();

adsHandler.attach(async (context, next) => {
  context.state['hello'] = 'world';
});


const context: ADSContext = { request: {}, response: {}, state: {} }
adsHandler.dispatch(context)

console.log(context)
