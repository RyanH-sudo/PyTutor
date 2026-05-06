'use client';

import { CodeRunner } from './code-runner';
import { EtymologyCard } from './etymology-card';
import { HistoryNote } from './history-note';
import { InterviewPhrase } from './interview-phrase';
import { FDEConnection } from './fde-connection';
import { Callout } from './callout';
import { Quiz } from './quiz';
import { KeyTerm } from './key-term';
import { Section } from './section';
import { Connection } from './connection';
import { Exercise } from './exercise';

/**
 * The map of components made available inside MDX lesson files.
 *
 * In a lesson `.mdx`, you can write:
 *   <EtymologyCard term="..." ... />
 *   <CodeRunner initial="print('hello')" />
 *   <Callout kind="tip">...</Callout>
 *   ...etc
 *
 * If you add a new pedagogical component, register it here so the MDX
 * compiler knows about it.
 */
export const mdxComponents = {
  CodeRunner,
  EtymologyCard,
  HistoryNote,
  InterviewPhrase,
  FDEConnection,
  Callout,
  Quiz,
  KeyTerm,
  Section,
  Connection,
  Exercise,
};
