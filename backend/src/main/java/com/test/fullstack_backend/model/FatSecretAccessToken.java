package com.test.fullstack_backend.model;

public class FatSecretAccessToken {
    private String access_token;
    private String token_type;
    private int expires_in; // TODO: We will need a token for when we got it and how long it lasts so we can
                            // calculate this accurately
    private String scope;

    // Getters and setters
    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public int getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(int expires_in) {
        this.expires_in = expires_in;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }
}
