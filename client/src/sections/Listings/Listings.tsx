import React, { useState, useEffect } from "react";
import { server, useQuery } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
  Listing,
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
      title
      address
      numOfBaths
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  console.log("i am running inside listing");

  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    refetch();
  };

  const listings = data ? data.listings : null;
  console.log("i am running outside");

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Uh oh! Something went wrong - please try again later :(</h2>;
  }
  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {console.log("i am running inside")}
    </div>
  );
};
