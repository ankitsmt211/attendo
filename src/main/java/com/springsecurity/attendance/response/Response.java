package com.springsecurity.attendance.response;

import java.util.ArrayList;
import java.util.List;

public class Response extends CustomResponse{
    private List<String> errors;
    public Response(boolean status, String message, String payload, List<String> errors) {
        super(status, message, payload);
        if (errors != null) {
            this.errors = errors;
        }
        else{
            this.errors = new ArrayList<>();
        }
    }

    @Override
    public String toString() {
        return "Response{" +
                "errors=" + errors +
                '}';
    }

    public List<String> getErrors() {
        return errors;
    }
}
