import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
function InfoBox({ title, cases, total }) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <h4>{cases}</h4>
          <Typography color="textSecondary">
              {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
