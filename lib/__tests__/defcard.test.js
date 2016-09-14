/* eslint-env jest */
import React from 'react';
import { parseArgs } from '../defcard';

describe('parseArgs', () => {
  it('defcard(title)', () => {
    expect(parseArgs(['Foo'])).toEqual({
      name: 'Foo',
      parts: [],
      options: {
        heading: true,
        inspectData: false,
        watchAtom: false,
        history: false,
      },
    });
  });

  it('defcard(title, node', () => {
    expect(parseArgs(['Foo', <div />])).toEqual({
      name: 'Foo',
      parts: [<div />],
      options: {
        heading: true,
        inspectData: false,
        watchAtom: false,
        history: false,
      },
    });
  });

  it('defcard(title, node, node)', () => {
    expect(parseArgs(['Foo', <div />, <div />])).toEqual({
      name: 'Foo',
      parts: [<div />, <div />],
      options: {
        heading: true,
        inspectData: false,
        watchAtom: false,
        history: false,
      },
    });
  });

  it('defcard(title, options)', () => {
    expect(parseArgs(['Foo', { custom: true }])).toEqual({
      name: 'Foo',
      parts: [],
      options: {
        heading: true,
        inspectData: false,
        watchAtom: false,
        history: false,
        custom: true,
      },
    });
  });

  it('defcard(title, node, options)', () => {
    expect(parseArgs(['Foo', <div />, { custom: true }])).toEqual({
      name: 'Foo',
      parts: [<div />],
      options: {
        custom: true,
        heading: true,
        inspectData: false,
        watchAtom: false,
        history: false,
      },
    });
  });

  it('defcard(title, fn, options)', () => {
    const fn = () => <div />;
    expect(parseArgs(['Foo', fn, { custom: true }])).toEqual({
      name: 'Foo',
      parts: [fn],
      options: {
        custom: true,
        heading: true,
        inspectData: false,
        watchAtom: false,
        history: false,
      },
    });
  });
});
