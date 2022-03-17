import ProfilePic from "./profile-pic";

import { render } from "@testing-library/react";

test("when url is not passed it ends up default", () => {
    const { container } = render(<ProfilePic />);
    expect(
        container
            .querySelector("img")
            .src.endsWith("defaultProfilePic.jpg")
            .toBe(true)
    );
});
