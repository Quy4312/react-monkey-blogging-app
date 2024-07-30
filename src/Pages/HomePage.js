import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import React, { useEffect } from "react";
import Header from "components/layout/Header";
import Layout from "components/layout/Layout";
import HomeBanner from "module/home/HomeBanner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";
import { useAuth } from "contexts/auth-contexts";
import PostRelated from "module/post/PostRelated";
import HomeRelated from "module/home/HomeRelated";
const HomePagestyles = styled.div``;
// const handleSignOut = () => {
//   signOut(auth);
// };
const HomePage = () => {
  useEffect(() => {
    document.title = "Monkey Blogging";
  }, []);

  return (
    <HomePagestyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
        <HomeRelated categoryId="GeNFsDblLYUYQSfVRIGM"></HomeRelated>
      </Layout>
    </HomePagestyles>
  );
};

export default HomePage;
