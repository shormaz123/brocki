import { DebounceClickDirective } from './app-prevent-double-click.directive';

describe('AppPreventDoubleClickDirective', () => {
  it('should create an instance', () => {
    const directive = new DebounceClickDirective();
    expect(directive).toBeTruthy();
  });
});
