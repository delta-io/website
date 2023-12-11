import React, { useEffect, useState } from "react";
import Section from "src/components/Section";
import axios from "axios";
import styled from "styled-components";
import { media } from "config/theme";
import eventLogoDefault from "../../public/images/eventLogoDefault.png";

const MainTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  margin-bottom: 30px;
`;

const EventsBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: ${(props) => props.theme.fontFamilyBase};
`;
const EventItem = styled.li`
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px 0 #00000040;
  background: white;
  flex-direction: column;
  align-items: center;

  @media ${media.md} {
    padding: 10px 20px 10px 10px;
    flex-direction: row;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const EventTitle = styled.h4`
  font-size: 22px;
  font-weight: 400;
  text-align: center;

  @media ${media.md} {
    text-align: left;
  }
`;

const EventDateBox = styled.div`
  text-align: center;
  margin-bottom: 10px;
  @media ${media.md} {
    margin-bottom: 0;
    text-align: left;
  }

  svg {
    margin-right: 3px;
  }
`;

const EventDate = styled.span`
  font-size: 12px;
  font-weight: 200;
  line-height: 14px;
  color: ${(props) => props.theme.colors.textThird};
  opacity: 0.7;
`;
const EventTimeBox = styled(EventDateBox)``;

const EventTime = styled(EventDate)``;

const EventDescriptionBox = styled.div`
  @media ${media.md} {
    margin-right: 20px;
  }
`;
const DataTimeBox = styled.div`
  display: flex;

  div {
    &:first-of-type {
      margin-right: 40px;
    }
  }
`;

const ImgEventBox = styled.div`
  max-width: 107px;
  height: 85px;
  width: 100%;
  margin-bottom: 10px;

  @media ${media.md} {
    margin-bottom: 0;
    margin-right: 25px;
  }
`;

const ImgEvent = styled.img`
  width: 100%;
`;

const SubscribeLink = styled.a`
  max-width: 155px;
  width: 100%;
  border-radius: 2px;
  background: ${(props) => props.theme.colors.primary};
  padding: 6px 15px;
  color: ${(props) => props.theme.dark.color};
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s ease-in-out;
  font-size: 18px;

  @media ${media.md} {
    margin-left: auto;
  }

  &:hover {
    color: ${(props) => props.theme.dark.color};
    background: ${(props) => props.theme.colors.link};
  }
`;

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const sortEvents = (currentEvents) => {
    setEvents(
      currentEvents.sort((a, b) => {
        const dateA = a.start.dateTime ? a.start.dateTime : a.start.date;
        const dateB = b.start.dateTime ? b.start.dateTime : b.start.date;

        return new Date(dateA) - new Date(dateB);
      })
    );
  };

  useEffect(() => {
    const calendarId = "deltalakeevents@gmail.com";
    const API_KEY = AIzaSyBd2n - A2Zlojy6H3brACodDTL5cotlNOEI;

    axios
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}`
      )
      .then((response) => {
        sortEvents(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const getOrdinalNum = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const formatDate = (dateString) => {
    const eventDate = new Date(dateString);
    const options = { month: "long" };
    const dayWithSuffix = getOrdinalNum(eventDate.getDate());
    const monthYear = `${eventDate.toLocaleDateString(
      "en-US",
      options
    )} ${eventDate.getFullYear()}`;
    return `${dayWithSuffix} ${monthYear}`;
  };

  const formatTime = (dateTimeString) => {
    const eventTime = new Date(dateTimeString);

    // uncomment timeZone if you need display time only America/Los_Angeles time zone now browser will be interpreted time in current time
    return eventTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      /* timeZone: 'America/Los_Angeles' */
    });
  };

  return (
    <Section padding="xxl" background={(theme) => theme.light.bg}>
      <MainTitle>Your guide to Events and Conferences</MainTitle>
      <EventsBox>
        {events &&
          events.map((event) => (
            <EventItem key={event.id}>
              <ImgEventBox>
                {event.attachments ? (
                  <ImgEvent
                    src={`https://drive.google.com/uc?export=view&id=${event.attachments[0].fileId}`}
                    alt={event.summary}
                  />
                ) : (
                  <ImgEvent src={eventLogoDefault} alt={event.summary} />
                )}
              </ImgEventBox>
              <EventDescriptionBox>
                <EventTitle>{event.summary}</EventTitle>
                {event?.start.date && (
                  <EventDateBox>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_93_222564"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="12"
                        height="12"
                      >
                        <rect width="12" height="12" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_93_222564)">
                        <path
                          d="M2.5 11C2.225 11 1.9895 10.9022 1.7935 10.7065C1.59783 10.5105 1.5 10.275 1.5 10V3C1.5 2.725 1.59783 2.48967 1.7935 2.294C1.9895 2.098 2.225 2 2.5 2H3V1H4V2H8V1H9V2H9.5C9.775 2 10.0105 2.098 10.2065 2.294C10.4022 2.48967 10.5 2.725 10.5 3V10C10.5 10.275 10.4022 10.5105 10.2065 10.7065C10.0105 10.9022 9.775 11 9.5 11H2.5ZM2.5 10H9.5V5H2.5V10ZM2.5 4H9.5V3H2.5V4ZM6 7C5.85833 7 5.73967 6.952 5.644 6.856C5.548 6.76033 5.5 6.64167 5.5 6.5C5.5 6.35833 5.548 6.2395 5.644 6.1435C5.73967 6.04783 5.85833 6 6 6C6.14167 6 6.2605 6.04783 6.3565 6.1435C6.45217 6.2395 6.5 6.35833 6.5 6.5C6.5 6.64167 6.45217 6.76033 6.3565 6.856C6.2605 6.952 6.14167 7 6 7ZM4 7C3.85833 7 3.7395 6.952 3.6435 6.856C3.54783 6.76033 3.5 6.64167 3.5 6.5C3.5 6.35833 3.54783 6.2395 3.6435 6.1435C3.7395 6.04783 3.85833 6 4 6C4.14167 6 4.2605 6.04783 4.3565 6.1435C4.45217 6.2395 4.5 6.35833 4.5 6.5C4.5 6.64167 4.45217 6.76033 4.3565 6.856C4.2605 6.952 4.14167 7 4 7ZM8 7C7.85833 7 7.73967 6.952 7.644 6.856C7.548 6.76033 7.5 6.64167 7.5 6.5C7.5 6.35833 7.548 6.2395 7.644 6.1435C7.73967 6.04783 7.85833 6 8 6C8.14167 6 8.26033 6.04783 8.356 6.1435C8.452 6.2395 8.5 6.35833 8.5 6.5C8.5 6.64167 8.452 6.76033 8.356 6.856C8.26033 6.952 8.14167 7 8 7ZM6 9C5.85833 9 5.73967 8.952 5.644 8.856C5.548 8.76033 5.5 8.64167 5.5 8.5C5.5 8.35833 5.548 8.23967 5.644 8.144C5.73967 8.048 5.85833 8 6 8C6.14167 8 6.2605 8.048 6.3565 8.144C6.45217 8.23967 6.5 8.35833 6.5 8.5C6.5 8.64167 6.45217 8.76033 6.3565 8.856C6.2605 8.952 6.14167 9 6 9ZM4 9C3.85833 9 3.7395 8.952 3.6435 8.856C3.54783 8.76033 3.5 8.64167 3.5 8.5C3.5 8.35833 3.54783 8.23967 3.6435 8.144C3.7395 8.048 3.85833 8 4 8C4.14167 8 4.2605 8.048 4.3565 8.144C4.45217 8.23967 4.5 8.35833 4.5 8.5C4.5 8.64167 4.45217 8.76033 4.3565 8.856C4.2605 8.952 4.14167 9 4 9ZM8 9C7.85833 9 7.73967 8.952 7.644 8.856C7.548 8.76033 7.5 8.64167 7.5 8.5C7.5 8.35833 7.548 8.23967 7.644 8.144C7.73967 8.048 7.85833 8 8 8C8.14167 8 8.26033 8.048 8.356 8.144C8.452 8.23967 8.5 8.35833 8.5 8.5C8.5 8.64167 8.452 8.76033 8.356 8.856C8.26033 8.952 8.14167 9 8 9Z"
                          fill="#4F4F4F"
                        />
                      </g>
                    </svg>
                    <EventDate>{formatDate(event.start.date)}</EventDate>
                  </EventDateBox>
                )}

                {event?.start.dateTime && (
                  <DataTimeBox>
                    <EventDateBox>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_93_222564"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="12"
                          height="12"
                        >
                          <rect width="12" height="12" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_93_222564)">
                          <path
                            d="M2.5 11C2.225 11 1.9895 10.9022 1.7935 10.7065C1.59783 10.5105 1.5 10.275 1.5 10V3C1.5 2.725 1.59783 2.48967 1.7935 2.294C1.9895 2.098 2.225 2 2.5 2H3V1H4V2H8V1H9V2H9.5C9.775 2 10.0105 2.098 10.2065 2.294C10.4022 2.48967 10.5 2.725 10.5 3V10C10.5 10.275 10.4022 10.5105 10.2065 10.7065C10.0105 10.9022 9.775 11 9.5 11H2.5ZM2.5 10H9.5V5H2.5V10ZM2.5 4H9.5V3H2.5V4ZM6 7C5.85833 7 5.73967 6.952 5.644 6.856C5.548 6.76033 5.5 6.64167 5.5 6.5C5.5 6.35833 5.548 6.2395 5.644 6.1435C5.73967 6.04783 5.85833 6 6 6C6.14167 6 6.2605 6.04783 6.3565 6.1435C6.45217 6.2395 6.5 6.35833 6.5 6.5C6.5 6.64167 6.45217 6.76033 6.3565 6.856C6.2605 6.952 6.14167 7 6 7ZM4 7C3.85833 7 3.7395 6.952 3.6435 6.856C3.54783 6.76033 3.5 6.64167 3.5 6.5C3.5 6.35833 3.54783 6.2395 3.6435 6.1435C3.7395 6.04783 3.85833 6 4 6C4.14167 6 4.2605 6.04783 4.3565 6.1435C4.45217 6.2395 4.5 6.35833 4.5 6.5C4.5 6.64167 4.45217 6.76033 4.3565 6.856C4.2605 6.952 4.14167 7 4 7ZM8 7C7.85833 7 7.73967 6.952 7.644 6.856C7.548 6.76033 7.5 6.64167 7.5 6.5C7.5 6.35833 7.548 6.2395 7.644 6.1435C7.73967 6.04783 7.85833 6 8 6C8.14167 6 8.26033 6.04783 8.356 6.1435C8.452 6.2395 8.5 6.35833 8.5 6.5C8.5 6.64167 8.452 6.76033 8.356 6.856C8.26033 6.952 8.14167 7 8 7ZM6 9C5.85833 9 5.73967 8.952 5.644 8.856C5.548 8.76033 5.5 8.64167 5.5 8.5C5.5 8.35833 5.548 8.23967 5.644 8.144C5.73967 8.048 5.85833 8 6 8C6.14167 8 6.2605 8.048 6.3565 8.144C6.45217 8.23967 6.5 8.35833 6.5 8.5C6.5 8.64167 6.45217 8.76033 6.3565 8.856C6.2605 8.952 6.14167 9 6 9ZM4 9C3.85833 9 3.7395 8.952 3.6435 8.856C3.54783 8.76033 3.5 8.64167 3.5 8.5C3.5 8.35833 3.54783 8.23967 3.6435 8.144C3.7395 8.048 3.85833 8 4 8C4.14167 8 4.2605 8.048 4.3565 8.144C4.45217 8.23967 4.5 8.35833 4.5 8.5C4.5 8.64167 4.45217 8.76033 4.3565 8.856C4.2605 8.952 4.14167 9 4 9ZM8 9C7.85833 9 7.73967 8.952 7.644 8.856C7.548 8.76033 7.5 8.64167 7.5 8.5C7.5 8.35833 7.548 8.23967 7.644 8.144C7.73967 8.048 7.85833 8 8 8C8.14167 8 8.26033 8.048 8.356 8.144C8.452 8.23967 8.5 8.35833 8.5 8.5C8.5 8.64167 8.452 8.76033 8.356 8.856C8.26033 8.952 8.14167 9 8 9Z"
                            fill="#4F4F4F"
                          />
                        </g>
                      </svg>
                      <EventDate>{formatDate(event.start.dateTime)}</EventDate>
                    </EventDateBox>

                    <EventTimeBox>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_93_222567"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="12"
                          height="12"
                        >
                          <rect width="12" height="12" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_93_222567)">
                          <path
                            d="M7.65 8.35L8.35 7.65L6.5 5.8V3.5H5.5V6.2L7.65 8.35ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.606C3.44167 10.3437 2.9125 9.9875 2.4625 9.5375C2.0125 9.0875 1.65633 8.55833 1.394 7.95C1.13133 7.34167 1 6.69167 1 6C1 5.30833 1.13133 4.65833 1.394 4.05C1.65633 3.44167 2.0125 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65617 4.05 1.3935C4.65833 1.13117 5.30833 1 6 1C6.69167 1 7.34167 1.13117 7.95 1.3935C8.55833 1.65617 9.0875 2.0125 9.5375 2.4625C9.9875 2.9125 10.3437 3.44167 10.606 4.05C10.8687 4.65833 11 5.30833 11 6C11 6.69167 10.8687 7.34167 10.606 7.95C10.3437 8.55833 9.9875 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3437 7.95 10.606C7.34167 10.8687 6.69167 11 6 11ZM6 10C7.10833 10 8.05217 9.6105 8.8315 8.8315C9.6105 8.05217 10 7.10833 10 6C10 4.89167 9.6105 3.94783 8.8315 3.1685C8.05217 2.3895 7.10833 2 6 2C4.89167 2 3.948 2.3895 3.169 3.1685C2.38967 3.94783 2 4.89167 2 6C2 7.10833 2.38967 8.05217 3.169 8.8315C3.948 9.6105 4.89167 10 6 10Z"
                            fill="#4F4F4F"
                          />
                        </g>
                      </svg>
                      <EventTime>{formatTime(event.start.dateTime)}</EventTime>
                    </EventTimeBox>
                  </DataTimeBox>
                )}
              </EventDescriptionBox>
              <SubscribeLink target="_blank" href={event.htmlLink}>
                Subscribe
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4299 5.93005L20.4999 12.0001L14.4299 18.0701"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12H20.33"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SubscribeLink>
            </EventItem>
          ))}
      </EventsBox>
    </Section>
  );
};

export default EventsList;
