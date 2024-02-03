import { google } from "googleapis";


// Load client secrets from a file downloaded from the Google Cloud Console.
const redirect_uri = "http://localhost:8082/"
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_KEY = 'gmailApiToken';

export async function getClient() {
  // Load OAuth 2.0 client credentials from the `public` folder
  // const credentials = {"installed":{"client_id":"314002233314-giv5f2img0n3dcq60qi445kd3te04cpd.apps.googleusercontent.com","project_id":"smart-bonus-340819","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:3000"]}}
  // const { client_secret, client_id, redirect_uris } = credentials.installed;

  // Initialize the OAuth client
  // const oAuth2Client = new google.auth.OAuth2(
  //   client_id,
  //   client_secret,
  //   redirect_uris[0]
  // );

  // // Check if we have a stored token
  // const token = localStorage.getItem(TOKEN_KEY);
  // if (token) {
  //   oAuth2Client.setCredentials(JSON.parse(token));
  //   return oAuth2Client;
  // } else {
  //   // If no token, initiate the OAuth 2.0 flow
  //   const authUrl = oAuth2Client.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES,
  //   });
  //   window.location.href = authUrl;
  // }
};
