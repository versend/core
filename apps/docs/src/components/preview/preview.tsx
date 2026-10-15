"use client";

import { useState } from "react";

import {
  Eyebrow,
  Section,
  SectionContent,
  SectionTitle,
} from "@/components/landing/section";
import { Frame, FrameHeader } from "@/components/ui/frame";
import { cn } from "@/lib/cn";

import { discordPreview, previewDestinations } from "./destinations";
import { Payload } from "./payload";
import { readyEvent, sampleEvents, toneBar } from "./samples";
import { Tab } from "./tab";

/**
 * Interactive section: pick a Vercel event and a destination to see the card
 * Versend posts.
 *
 * @returns The section element.
 */
export const Preview = () => {
  const [eventType, setEventType] = useState(readyEvent.type);
  const [destinationName, setDestinationName] = useState(discordPreview.name);
  const event =
    sampleEvents.find((entry) => entry.type === eventType) ?? readyEvent;
  const destination =
    previewDestinations.find((entry) => entry.name === destinationName) ??
    discordPreview;
  const { Card } = destination;

  return (
    <Section id="preview">
      <SectionContent>
        <Eyebrow index="02">What lands in the channel</Eyebrow>
        <SectionTitle>The same event, drawn for each destination.</SectionTitle>
        <p className="text-fd-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
          Pick an event and a destination. Every card carries the project,
          target, branch, commit and message, plus the build error when there is
          one.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {sampleEvents.map((entry) => (
            <Tab
              active={entry.type === event.type}
              key={entry.type}
              onClick={() => setEventType(entry.type)}
            >
              <span className={cn("size-1.5", toneBar[entry.tone])} />
              {entry.type}
            </Tab>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Frame className="overflow-hidden">
            <FrameHeader>
              <span>webhook</span>
              <span className="normal-case">POST /hooks/vercel</span>
            </FrameHeader>
            <Payload event={event} />
          </Frame>

          <Frame className="overflow-hidden">
            <FrameHeader wrap>
              <div className="flex flex-wrap gap-1.5">
                {previewDestinations.map((entry) => (
                  <Tab
                    active={entry.name === destination.name}
                    key={entry.name}
                    onClick={() => setDestinationName(entry.name)}
                  >
                    <entry.Icon className="size-3.5" />
                    {entry.name}
                  </Tab>
                ))}
              </div>
              <span className="normal-case">{destination.env}</span>
            </FrameHeader>
            <Card event={event} />
          </Frame>
        </div>
      </SectionContent>
    </Section>
  );
};
