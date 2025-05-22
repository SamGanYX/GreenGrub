package com.test.fullstack_backend.model;

public class FatSecretAccessToken {
    private String access_token;
    private String token_type;
    private int expires_in; //TODO: We will need a token for when we got it and how long it lasts so we can calculate this accurately
    private String scope;

    // Getters and setters
    public String getAccessToken() {
        return access_token;
    }

    public void setAccessToken(String access_token) {
        this.access_token = access_token;
    }

    public String getTokenType() {
        return token_type;
    }

    public void setTokenType(String token_type) {
        this.token_type = token_type;
    }

    public int getExpiresIn() {
        return expires_in;
    }

    public void setExpiresIn(int expires_in) {
        this.expires_in = expires_in;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
}
