/*
    Note: confidential.js is not included in GitHub repository.
    Here is a template for it.
*/
module.exports = {
    JWT_SESSION_TOKEN_SECRET: 'iwishicouldcomeupwithsomethingreallyfunnyhere',
    JWT_PASSWORD_RESET_AUTHENTICATION_SECRET: 'probablybestoffgeneratingrandomstuff',
    JWT_COLLABORATION_TOKEN_SECRET: 'badgerOneYourMissionIsToEngageBadgerTwo',
    BCRYPT_SALT_ROUNDS: 4 // 4 Not recommended, needs to be higher.  For good explanation of why this is configurable, see http://dustwell.com/how-to-handle-passwords-bcrypt.html.
};