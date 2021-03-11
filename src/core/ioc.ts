import { Controller } from 'tsoa';
import { Container, inject, interfaces, decorate, injectable } from '../../node_modules/inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import 'reflect-metadata';

decorate(injectable(), Controller);

type Identifier = string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>;

const iocContainer = new Container();

const provide = makeProvideDecorator(iocContainer);
const fluentProvider = makeFluentProvideDecorator(iocContainer);

const ProvideNamed = (identifier: Identifier, name: string): any => fluentProvider(identifier).whenTargetNamed(name).done();

const AddSingleton = (identifier: Identifier): any => fluentProvider(identifier).inSingletonScope().done();
const AddTransient = (identifier: Identifier): any => fluentProvider(identifier).inTransientScope().done();

export {
  iocContainer,
  autoProvide,
  provide,
  AddSingleton,
  AddTransient,
  ProvideNamed,
  inject,
  decorate,
  injectable
};
