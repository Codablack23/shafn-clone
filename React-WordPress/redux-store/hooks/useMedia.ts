"use client";

import MediaRepository from '../../repositories/MediaRepository';
import CollectionRepository from '../../repositories/CollectionRepository';
import { useEffect } from "react";
import { useAppDispatch } from '.';
import { AppDispatch } from '../store';
import { getBannersSuccess } from '@/store/media/action';
import { get_banners_success, get_promotions_success } from '../media';
import { get_collections_success } from '../collection';

const collectionsSlug = [
    "deal-of-the-day",
    "consumer-electronics",
    "clothings",
    "garden-and-kitchen",
    "new-arrivals-products",
    "fullwidth-consumer-electronic-best-seller",
    "fullwidth-consumer-electronic-most-popular",
    "fullwidth-clothing-best-sellers",
    "fullwidth-clothing-most-popular",
    "fullwidth-kitchen-most-popular",
    "fullwidth-kitchen-best-sellers",
];
const bannerSlugs = ["banner-home-fullwidth"];
const promotionSlugs = ["home_fullwidth_promotions"];

export const useMedia = ()=>{
  const dispatch:AppDispatch = useAppDispatch()

  useEffect(()=>{
    async function getBannersBySlugs(){
        try {
            const data = await MediaRepository.getBannersBySlugs(bannerSlugs)
            dispatch(get_banners_success(data))
        } catch (error) {
            // console.log(error)
        }
    }
    async function getPromotionBySlugs(){
        try {
            const data = await MediaRepository.getPromotionsBySlugs(promotionSlugs)
            dispatch(get_promotions_success(data))
            // console.log(data)
        } catch (error) {
            // console.log(error)
        }
    }
    async function getCollections() {
      try {
          const data =  await CollectionRepository.getCollections(collectionsSlug)
          dispatch(get_collections_success(data))
        //   console.log(data)
      } catch (err) {
        //   console.log(err);
      }
  }
    getBannersBySlugs()
    getPromotionBySlugs()
    getCollections()
  },[])
}