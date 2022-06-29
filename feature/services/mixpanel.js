/**
 * Mixpanel module.
 * @module services/mixpanel
 */
 const Mixpanel = require('mixpanel');

 const TOOL_NAME = process.env.TOOL_NAME || 'CX SHIELD';
 const RELEASE_ID = process.env.RELEASE_ID || '1';
 const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN || 'NoToken';
 
 const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);
 
 module.exports = {
     mixpanel: mixpanel,
     mixpanel_track_action_legacy: (domain, username, category) => {
         mixpanel.track(TOOL_NAME, {
             release: RELEASE_ID,
             domain: domain,
             username: username,
             category: category
         });
     },
     mixpanel_track_action: (category, uuid, email, action, label) => {
         mixpanel.track(TOOL_NAME, {
             release: RELEASE_ID,
             category: category,
             action: action,
             label: label,
             org_id: "",
             org_type: "microsite",
             email: email,
             uuid: uuid
         });
     },
     mixpanel_track_error: (domain, username, category) => {
         mixpanel.track(TOOL_NAME, {
             release: RELEASE_ID,
             domain: domain,
             username: username,
             category: category
         });
     },
 };